import { useState } from "react";
import CancelFilter from "../components/CancelFilter";
import CancelTable from "../components/CancelTable";
import ViewCancelModal from "../components/ViewCancelModal";
import EditCancelModal from "../components/EditCancelModal";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";

export default function CancelPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [toYear, setToYear] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [cancelRecords, setCancelRecords] = useState([
    {
      id: 1,
      customerName: "شرکت الف",
      invoiceCode: "INV-001",
      invoiceDate: "1403/01/15",
      amount: 1500000,
      cancelReason: "خطا در محاسبه مالیات",
      status: "در انتظار تایید",
      requestDate: "1403/01/20",
    },
    {
      id: 2,
      customerName: "شرکت ب",
      invoiceCode: "INV-002",
      invoiceDate: "1403/01/10",
      amount: 2300000,
      cancelReason: "درخواست مشتری",
      status: "تایید شده",
      requestDate: "1403/01/18",
    },
    {
      id: 3,
      customerName: "شرکت ج",
      invoiceCode: "INV-003",
      invoiceDate: "1403/01/05",
      amount: 850000,
      cancelReason: "تکرار فاکتور",
      status: "رد شده",
      requestDate: "1403/01/12",
    },
  ]);

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

  const handleExportExcel = () => {
    console.log("Export to Excel");
    // Implement export functionality
  };

  const handleAddNew = () => {
    console.log("Add new cancellation");
    // Implement add new functionality
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
  const filteredRecords = cancelRecords.filter(
    (record) =>
      record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.invoiceCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">ابطال</h1>
          <div className="flex items-center justify-between mt-1">
            <p className="text-white/60 text-sm">نمای کلی ابطال کاربران</p>
            <div className="flex gap-3">
              <button className="btn-custom" onClick={handleAddNew}>
                جدید
                <span className="inline-block">
                  <HiOutlinePlusSm className="w-5 h-5" />
                </span>
              </button>
              <button className="btn-custom" onClick={handleExportExcel}>
                به اکسل
                <span className="inline-block">
                  <GrDocumentExcel className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CancelFilter
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
      />

      <div className="mt-6">
        <CancelTable
          records={filteredRecords}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

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
