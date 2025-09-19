import { useState, useEffect } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import ReportsFilter from "../components/ReportsFilter";
import RecordsTable from "../components/RecordsTable";
import CustomersRecordsTable from "../components/CustomersRecordsTable";
import ServicesRecordsTable from "../components/ServicesRecordsTable";
import SettlementRecordsTable from "../components/SettlementRecordsTable";
import SendRecordsTable from "../components/SendRecordsTable";
import axiosClient from "../axios-client";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);
  
  const [activeFilters, setActiveFilters] = useState({});
  const [filterTable, setFilterTable] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [records] = useState([
    {
      name: "شرکت الف",
      factorMain: "13477767",
      factorCorrective: "TM-17003",
      factorReturn: "EC-478866",
      factorCancellation: "CC1111",
      pure: "11115",
    },
    {
      name: "شرکت ج",
      factorMain: "134567",
      factorCorrective: "TM-1003",
      factorReturn: "EC-445566",
      factorCancellation: "CCC333",
      pure: "123455",
    },
  ]);
  const [records2] = useState([
    {
      name: "بجنورد",
      factorMain: "13477767",
      factorCorrective: "TM-17003",
      factorReturn: "EC-478866",
      factorCancellation: "CC1111",
      pure: "11115",
    },
    {
      name: "تهران",
      factorMain: "134567",
      factorCorrective: "TM-1003",
      factorReturn: "EC-445566",
      factorCancellation: "CCC333",
      pure: "123455",
    },
  ]);
  const buildFilterQuery = (filters) => {
    const params = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "type") {
          params.push(`${key}=${value}`);
        } else {
          params.push(`f[${key}]=${encodeURIComponent(value)}`);
        }
      }
    });
    return params.length ? "&" + params.join("&") : "";
  };
  
  useEffect(() => {
    setLoading(true);
    const query = buildFilterQuery(activeFilters);
    axiosClient
      .get(`/invoices?page=${pageCount}${query}`)
      .then((response) => {
        setDataTable(response.data.data);
        setMeta(response.data.meta);
        console.log(`response.data.data`, response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh, activeFilters, pageCount]);
  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const handleFromMonthChange = (selectedDate) => {
    setFromMonth(selectedDate);
  };

  const handleToMonthChange = (selectedDate) => {
    setToMonth(selectedDate);
  };

  const handleClearAll = () => {
    setStartDate(null);
    setEndDate(null);

    setFromMonth(null);
    setToMonth(null);
  };

  function toEnglishDigits(str) {
    if (!str) return "";
    return str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
  }

  const handleSendAll = () => {
    const start = toEnglishDigits(startDate?.format?.("YYYY/MM/DD") || "");
    const end = toEnglishDigits(endDate?.format?.("YYYY/MM/DD") || "");
    const startMonth = toEnglishDigits(fromMonth?.format?.("YYYY/MM/DD") || "");
    const endMonth = toEnglishDigits(toMonth?.format?.("YYYY/MM/DD") || "");
  
    let created_at = start;
    if (start && end) {
      created_at = `${start},${end}`;
    } else if (startMonth && endMonth) {
      created_at = `${startMonth},${endMonth}`;
    }
    const newFilters = {
      created_at,
      status: status || "",
    };
  
    setActiveFilters(newFilters);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  // Filter records based on search term
  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecords2 = records2.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">گزارش</h1>
          <p className="text-white/60 text-sm mt-1">نمای کلی گزارش کاربران</p>
        </div>
      </div>

      <ReportsFilter
        startDate={startDate}
        endDate={endDate}
        fromMonth={fromMonth}
        toMonth={toMonth}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onFromMonthChange={handleFromMonthChange}
        onToMonthChange={handleToMonthChange}
        onClearAll={handleClearAll}
        setStatus={setStatus}
        status={status}
        onSendAll={handleSendAll}
        setStartDate = {setStartDate}
        setEndDate= {setEndDate}
        setFromMonth={setFromMonth}
        setToMonth={setToMonth}
      />
      <div className="mt-3">
        <SearchFilterBar
          setFilterTable={setFilterTable}
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
        />
      </div>
      <div className="mt-6">
        {filterTable === "" && <RecordsTable records={filteredRecords} />}
        {filterTable === "مشتری" && (
          <CustomersRecordsTable records={filteredRecords2} />
        )}
        {filterTable === "کالا/خدمات" && (
          <ServicesRecordsTable records={filteredRecords} />
        )}
        {filterTable === "روش تسویه" && (
          <SettlementRecordsTable records={filteredRecords2} />
        )}
        {filterTable === "وضعیت ارسال" && (
          <SendRecordsTable records={dataTable} />
        )}
      </div>
    </div>
  );
}
