
import { useState, useEffect, useCallback } from "react";
import ReportsFilterBill from "../components/ReportsFilterBill";
import BillRecordsTable from "../components/BillRecordsTable";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";
import InvoiceDetailsModal from "../components/InvoiceDetailsModal";

export default function CompareInvoices() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // جدید
  const [meta, setMeta] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState([]);
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("all"); // همه، واریز، برداشت
  const [trackingCode, setTrackingCode] = useState(""); // کد رهگیری

  const [filterRemove, setFilterRemove] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  const buildFilterQuery = useCallback(
    (filters) => {
      const params = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key === "type") {
            params.push(`${key}=${value}`);
          } else if (key.startsWith("f[date]") && filterRemove) {
            params.push(`${key}=${encodeURIComponent(value)}`);
          } else if (key === "coefficient" && filterRemove) {
            params.push(`f[coefficient]=${value}`);
          } else if (key === "tracking_code" && filterRemove) {
            params.push(`f[tracking_code]=${encodeURIComponent(value)}`);
          } else if (filterRemove) {
            const encodedValue =
              key === "status" ? value : encodeURIComponent(value);
            params.push(`f[${key}]=${encodedValue}`);
          }
        }
      });
      return params.length ? "&" + params.join("&") : "";
    },
    [filterRemove]
  );

  useEffect(() => {
    setLoading(true);
    let query = buildFilterQuery(activeFilters);
    axiosClient
      .get(`/transactions?page=${pageCount}${query}`)
      .then((response) => {
        setDataTable(response.data.data || []);
        setMeta(response.data?.meta || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters, pageCount, filterRemove]);

  // فیلتر کردن داده‌ها بر اساس searchTerm
  useEffect(() => {
    if (!Array.isArray(dataTable)) {
      setFilteredData([]);
      return;
    }
    if (searchTerm.trim() === "") {
      setFilteredData(dataTable);
    } else {
      const filtered = dataTable.filter(
        (item) => item.title && item.title.includes(searchTerm.trim())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, dataTable]);

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const handleClearAll = () => {
    setStartDate(null);
    setEndDate(null);
    setFilterRemove(false);
    setStatus([]);
    setFromMonth(null);
    setToMonth(null);
    setTransactionType("all");
    setTrackingCode("");
  };

  function toEnglishDigits(str) {
    if (!str) return "";
    return str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
  }

  const handleSendAll = () => {
    setFilterRemove(true);
    const start = toEnglishDigits(startDate?.format?.("YYYY/MM/DD") || "");
    const end = toEnglishDigits(endDate?.format?.("YYYY/MM/DD") || "");
    const startMonth = toEnglishDigits(fromMonth?.format?.("YYYY/MM/DD") || "");
    const endMonth = toEnglishDigits(toMonth?.format?.("YYYY/MM/DD") || "");

    let minDate = "";
    let maxDate = "";

    if (start && end) {
      minDate = start;
      maxDate = end;
    } else if (startMonth && endMonth) {
      minDate = startMonth;
      maxDate = endMonth;
    }

    const newFilters = {
      "f[date][min]": minDate,
      "f[date][max]": maxDate,
      status: Array.isArray(status) && status.length ? status.join(",") : "",
    };

    // اضافه کردن فیلتر نوع تراکنش فقط اگر "همه" انتخاب نشده باشد
    if (transactionType !== "all") {
      newFilters.coefficient = transactionType === "deposit" ? "1" : "-1";
    }

    // اضافه کردن فیلتر کد رهگیری فقط اگر مقدار داشته باشد
    if (trackingCode && trackingCode.trim() !== "") {
      newFilters.tracking_code = trackingCode.trim();
    }

    setActiveFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">تطبیق فاکتور فروش و خرید</h1>
          <p className="text-white/60 text-sm mt-1">
            نمای کلی تطبیق فاکتور فروش و خرید
          </p>
        </div>
      </div>
      <div className="p-2">
        <ReportsFilterBill
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onClearAll={handleClearAll}
          setStatus={setStatus}
          status={status}
          onSendAll={handleSendAll}
          transactionType={transactionType}
          onTransactionTypeChange={setTransactionType}
          trackingCode={trackingCode}
          onTrackingCodeChange={setTrackingCode}
        />

        <div className="mt-6">
          <>
            <BillRecordsTable
              records={filteredData}
              loading={loading}
              selectedCustomerId={selectedCustomerId}
              setSelectedCustomerId={setSelectedCustomerId}
            />

            <Pagination
              meta={meta}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
            />
          </>

          {isInvoiceDetailsOpen && (
            <InvoiceDetailsModal
              isOpen={isInvoiceDetailsOpen}
              onClose={() => setIsInvoiceDetailsOpen(false)}
              //  data={invoiceDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
}