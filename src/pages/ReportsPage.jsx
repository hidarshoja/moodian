import { useState } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import ReportsFilter from "../components/ReportsFilter";
import RecordsTable from "../components/RecordsTable";
import CustomersRecordsTable from "../components/CustomersRecordsTable";
import ServicesRecordsTable from "../components/ServicesRecordsTable";
import SettlementRecordsTable from "../components/SettlementRecordsTable";
import SendRecordsTable from "../components/SendRecordsTable";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);

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
  const handleSendAll = () => {
    console.log(`status`, status);
    console.log(`startDate`, startDate ? startDate.format?.("YYYY/MM/DD") : "");
  console.log(`endDate`, endDate ? endDate.format?.("YYYY/MM/DD") : "");
  console.log(`fromMonth`, fromMonth ? fromMonth.format?.("YYYY/MM") : "");
  console.log(`toMonth`, toMonth ? toMonth.format?.("YYYY/MM") : "");
  }

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
        onSendAll ={handleSendAll}
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
          <SendRecordsTable records={filteredRecords} />
        )}
      </div>
    </div>
  );
}
