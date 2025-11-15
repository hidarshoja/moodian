import { useState, useEffect, useCallback } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import ReportsFilter from "../components/ReportsFilter";
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
  const [filteredData, setFilteredData] = useState([]); // جدید
  const [meta, setMeta] = useState({});
  const [meta2, setMeta2] = useState({});
  const [meta3, setMeta3] = useState({});
  const [meta4, setMeta4] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const [filterTable, setFilterTable] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [stemId, setStemId] = useState(null);
  const [stem, setStem] = useState(null);
  const [statusName, setStatusName] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [filterRemove, setFilterRemove] = useState(true);

  const buildFilterQuery = useCallback(
    (filters) => {
      const params = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key === "type") {
            params.push(`${key}=${value}`);
          } else if (key.startsWith("f[indatim]") && filterRemove) {
            params.push(`${key}=${encodeURIComponent(value)}`);
          } else if (filterRemove) {
            params.push(`f[${key}]=${encodeURIComponent(value)}`);
          }
        }
      });
      return params.length ? "&" + params.join("&") : "";
    },
    [filterRemove]
  );

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

    let query = buildFilterQuery(activeFilters) + `&group_by=${groupByValue}`;
    if (selectedCustomerId) {
      query += `&f[customer_id]=${selectedCustomerId}`;
    }
    if (selectedProductId) {
      query += `&f[items.product_id]=${selectedProductId}`;
    }
    if (stemId) {
      query += `&f[setm]=${stemId}`;
    }
    if (statusId) {
      query += `&f[status]=${statusId}`;
    }
    axiosClient
      .get(`/report/invoice/ins-summery?page=${pageCount}${query}`)
      .then((response) => {
        setDataTable(response.data.data || []);
        if (filterTable === "مشتری") {
          setMeta(response.data.data?.meta || {});
        } else if (filterTable === "کالا/خدمات") {
          setMeta2(response.data.data?.meta || {});
        } else if (filterTable === "روش تسویه") {
          setMeta3(response.data.data?.meta || {});
        } else if (filterTable === "وضعیت ارسال") {
          setMeta4(response.data.data?.meta || {});
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [
    // activeFilters,
    // pageCount,
    // filterTable,
    // filterRemove,
    // selectedCustomerId,
    // selectedProductId,
    // statusId,
    // stemId,
    // buildFilterQuery,
    activeFilters,
    pageCount,
    filterTable,
    filterRemove,
  ]);

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

  const handleFromMonthChange = (selectedDate) => {
    setFromMonth(selectedDate);
  };

  const handleToMonthChange = (selectedDate) => {
    setToMonth(selectedDate);
  };

  const handleClearAll = () => {
    setStartDate(null);
    setEndDate(null);
    setFilterRemove(false);
    setFromMonth(null);
    setToMonth(null);
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
      "f[indatim][min]": minDate,
      "f[indatim][max]": maxDate,
      status: status || "",
    };

    setActiveFilters(newFilters);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleRequestInvoiceDetails = async () => {
    try {
      if (selectedCustomerId) {
        const res = await axiosClient.get(
          `/invoices?f[customer_id]=${selectedCustomerId}`
        );
        setInvoiceDetails(res.data);
        setIsInvoiceDetailsOpen(true);
      } else if (selectedProductId) {
        const res = await axiosClient.get(
          `/invoices?f[items.product_id]=${selectedProductId}`
        );
        setInvoiceDetails(res.data);
        setIsInvoiceDetailsOpen(true);
      } else if (stemId) {
        const res = await axiosClient.get(`/invoices?f[setm]=${stemId}`);
        setInvoiceDetails(res.data);
        setIsInvoiceDetailsOpen(true);
      } else if (statusId) {
        const res = await axiosClient.get(`/invoices?f[status]=${statusId}`);
        setInvoiceDetails(res.data);
        setIsInvoiceDetailsOpen(true);
      } else {
        return;
      }
    } catch (err) {
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
          selectedProductId={selectedProductId}
          stemId={stemId}
          statusId={statusId}
          startDate={startDate}
          endDate={endDate}
          filterTable={filterTable}
          setSearchTerm={setSearchTerm}
          selectedCustomer={selectedCustomer}
          selectedProduct={selectedProduct}
          stem={stem}
          statusName={statusName}
        />
      </div>
      <div className="mt-6">
        {filterTable === "" && (
          <>
            <div className="text-white/60 text-sm mt-1 flex justify-center items-center h-full border border-white/10 rounded-2xl p-4 ">
              <p className="text-white/60 text-sm py-10">
                لطفا یک فیلتر را انتخاب کنید
              </p>
            </div>
          </>
        )}
        {filterTable === "مشتری" && (
          <>
            <CustomersRecordsTable
              records={filteredData}
              loading={loading}
              selectedCustomerId={selectedCustomerId}
              setSelectedCustomerId={setSelectedCustomerId}
              setSelectedCustomer={setSelectedCustomer}
            />

            <Pagination
              meta={meta}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
            />
          </>
        )}
        {filterTable === "کالا/خدمات" && (
          <>
            <ServicesRecordsTable
              records={filteredData}
              loading={loading}
              setSelectedProductId={setSelectedProductId}
              selectedProductId={selectedProductId}
              setSelectedCustomerId={setSelectedCustomerId}
              setSelectedProduct={setSelectedProduct}
            />

            <Pagination
              meta={meta2}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
            />
          </>
        )}
        {filterTable === "روش تسویه" && (
          <>
            <SettlementRecordsTable
              records={filteredData}
              loading={loading}
              stemId={stemId}
              setStemId={setStemId}
              setSelectedProductId={setSelectedProductId}
              setSelectedCustomerId={setSelectedCustomerId}
              setStem={setStem}
            />

            <Pagination
              meta={meta3}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
            />
          </>
        )}
        {filterTable === "وضعیت ارسال" && (
          <>
            <SendRecordsTable
              records={filteredData}
              loading={loading}
              setStemId={setStemId}
              setSelectedProductId={setSelectedProductId}
              setSelectedCustomerId={setSelectedCustomerId}
              setStatusId={setStatusId}
              statusId={statusId}
              setStatusName={setStatusName}
            />

            <Pagination
              meta={meta4}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
            />
          </>
        )}

        {isInvoiceDetailsOpen && invoiceDetails && (
          <InvoiceDetailsModal
            isOpen={isInvoiceDetailsOpen}
            onClose={() => setIsInvoiceDetailsOpen(false)}
            data={invoiceDetails}
          />
        )}
      </div>
    </div>
  );
}
