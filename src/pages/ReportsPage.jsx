import { useState, useEffect } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import ReportsFilter from "../components/ReportsFilter";
import RecordsTable from "../components/RecordsTable";
import CustomersRecordsTable from "../components/CustomersRecordsTable";
import ServicesRecordsTable from "../components/ServicesRecordsTable";
import SettlementRecordsTable from "../components/SettlementRecordsTable";
import SendRecordsTable from "../components/SendRecordsTable";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";
import InvoiceDetailsModal from "../components/InvoiceDetailsModal";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [meta, setMeta] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const [filterTable, setFilterTable] = useState("مشتری");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // new state
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

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
  console.log(`selectedCustomerId`, selectedCustomerId);
  // useEffect(() => {
  //   setLoading(true);
  //   const query = buildFilterQuery(activeFilters);
  //   axiosClient
  //     .get(`/invoices?page=${pageCount}${query}`)
  //     .then((response) => {
  //       setDataTable(response.data.data);
  //       setMeta(response.data.meta);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     })
  //     .finally(() => setLoading(false));
  // }, [refresh, activeFilters, pageCount]);

  useEffect(() => {
 
    setLoading(true);

    let groupByValue;
    switch (filterTable) {
      case "کالا/خدمات":
        groupByValue = "product_id";
        break;
      case "روش تسویه":
        groupByValue = "setm";
        break;
      case "وضعیت ارسال":
        groupByValue = "status";
        break;
      default:
        groupByValue = "customer_id";
    }
    const query = buildFilterQuery(activeFilters) + `&group_by=${groupByValue}`;
    axiosClient
      .get(`/report/invoice/ins-summery?page=${pageCount}${query}`)
      .then((response) => {
        setDataTable(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [activeFilters, pageCount, filterTable]);

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

  // function to handle invoice details fetch
  const handleRequestInvoiceDetails = async () => {
    if (!selectedCustomerId) return;
   
    try {
      const res = await axiosClient.get(
        `/invoices?f[customer_id]=${selectedCustomerId}`
      );
      setInvoiceDetails(res.data);
      setIsInvoiceDetailsOpen(true);
    } catch (err) {
      // optionally show a toast or error state
      setInvoiceDetails(null);
    } 
  };

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
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setFromMonth={setFromMonth}
        setToMonth={setToMonth}
      />
      <div className="mt-3">
        <SearchFilterBar
          setFilterTable={setFilterTable}
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
          onRequestInvoiceDetails={handleRequestInvoiceDetails}
          selectedCustomerId={selectedCustomerId}
        />
      </div>
      <div className="mt-6">
       
        {filterTable === "مشتری" && (
          <CustomersRecordsTable
            records={dataTable}
            loading={loading}
            selectedCustomerId={selectedCustomerId}
            setSelectedCustomerId={setSelectedCustomerId}
          />
        )}
        {filterTable === "کالا/خدمات" && (
          <ServicesRecordsTable
           records={dataTable}
            loading={loading}
            setSelectedProductId={setSelectedProductId}
            selectedProductId={selectedProductId} />
        )}
        {filterTable === "روش تسویه" && (
          <SettlementRecordsTable records={dataTable} loading={loading} />
        )}
        {filterTable === "وضعیت ارسال" && (
          <SendRecordsTable records={dataTable} loading={loading} />
        )}

{isInvoiceDetailsOpen && invoiceDetails && (
  <InvoiceDetailsModal
    isOpen={isInvoiceDetailsOpen}
    onClose={() => setIsInvoiceDetailsOpen(false)}
    data={invoiceDetails}
  />
)}
        {/* <Pagination
          meta={meta}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setLoading={setLoading}
        /> */}
      </div>
      {/* TODO: render modal here later */}
    </div>
  );
}
