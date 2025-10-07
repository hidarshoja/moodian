import { useState , useEffect } from "react";
import CancelFilter from "../components/CancelFilter";
import CancelTable from "../components/CancelTable";
import ViewCancelModal from "../components/ViewCancelModal";
import EditCancelModal from "../components/EditCancelModal";
import { HiOutlinePlusSm } from "react-icons/hi";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

export default function CancelPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [toYear, setToYear] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cancelRecords, setCancelRecords] = useState([]);
  const [refresh , setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
  
    axiosClient
      .get(`/invoices?page=${pageCount}&f[ins]=3`)
      .then((response) => {
        setCancelRecords(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [ refresh , pageCount]);

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const handleFromYearChange = (selectedDate) => {
    setFromYear(selectedDate);
  };

  const handleToYearChange = (selectedDate) => {
    setToYear(selectedDate);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleClearAll = () => {
    setStartDate(null);
    setEndDate(null);
    setFromYear(null);
    setToYear(null);
    setSearchTerm("");
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record) => {
    console.log("Delete record:", record);
    setCancelRecords((prev) => prev.filter((r) => r.id !== record.id));
  };

  const handleApprove = (record) => {
    console.log("Approve record:", record);
    setCancelRecords((prev) =>
      prev.map((r) => (r.id === record.id ? { ...r, status: "تایید شده" } : r))
    );
  };

  const handleReject = (record) => {
    console.log("Reject record:", record);
    setCancelRecords((prev) =>
      prev.map((r) => (r.id === record.id ? { ...r, status: "رد شده" } : r))
    );
  };

  

  const handleSaveEdit = (updatedRecord) => {
    setCancelRecords((prev) =>
      prev.map((r) =>
        r.id === selectedRecord.id ? { ...r, ...updatedRecord } : r
      )
    );
    setEditModalOpen(false);
    setSelectedRecord(null);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedRecord(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedRecord(null);
  };

  // Filter records based on search term


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">ابطال</h1>
          <div className="flex items-center justify-between mt-1">
            <p className="text-white/60 text-sm">نمای کلی ابطال کاربران</p>
           
          </div>
        </div>
      </div>

      {/* <CancelFilter
        startDate={startDate}
        endDate={endDate}
        fromYear={fromYear}
        toYear={toYear}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onFromYearChange={handleFromYearChange}
        onToYearChange={handleToYearChange}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onClearAll={handleClearAll}
      /> */}

      <div className="mt-6">
        <CancelTable
          records={cancelRecords}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
          loading={loading}
          setRefresh = {setRefresh}
          refresh={refresh}
        />
      </div>
      <Pagination
        meta={meta}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
      />
      {/* Modals */}
      <ViewCancelModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        record={selectedRecord}
      />

      <EditCancelModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        record={selectedRecord}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
