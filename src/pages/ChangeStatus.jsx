import { useState } from "react";
import StatusFilter from "../components/StatusFilter";
import StatusTable from "../components/StatusTable";
import ViewStatusModal from "../components/ViewStatusModal";
import EditStatusModal from "../components/EditStatusModal";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";

export default function ChangeStatus() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [toYear, setToYear] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [statusRecords, setStatusRecords] = useState([
    {
      id: 1,
      customerName: "شرکت الف",
      invoiceCode: "INV-001",
      previousStatus: "در انتظار تایید",
      newStatus: "تایید شده",
      changeReason: "درخواست مشتری",
      requestDate: "1403/01/20",
      changeDate: "1403/01/22",
    },
    {
      id: 2,
      customerName: "شرکت ب",
      invoiceCode: "INV-002",
      previousStatus: "تایید شده",
      newStatus: "رد شده",
      changeReason: "تصحیح خطا",
      requestDate: "1403/01/18",
      changeDate: "1403/01/19",
    },
    {
      id: 3,
      customerName: "شرکت ج",
      invoiceCode: "INV-003",
      previousStatus: "در حال بررسی",
      newStatus: "در انتظار تایید",
      changeReason: "بروزرسانی اطلاعات",
      requestDate: "1403/01/15",
      changeDate: null,
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
   
    setStatusRecords((prev) => prev.filter((r) => r.id !== record.id));
  };

  const handleApprove = (record) => {
   
    setStatusRecords((prev) =>
      prev.map((r) =>
        r.id === record.id
          ? { ...r, newStatus: "تایید شده", changeDate: "1403/01/25" }
          : r
      )
    );
  };

  const handleReject = (record) => {
   
    setStatusRecords((prev) =>
      prev.map((r) =>
        r.id === record.id
          ? { ...r, newStatus: "رد شده", changeDate: "1403/01/25" }
          : r
      )
    );
  };

  const handleExportExcel = () => {
    console.log("Export to Excel");
    // Implement export functionality
  };

  const handleAddNew = () => {
    console.log("Add new status change");
    // Implement add new functionality
  };

  const handleSaveEdit = (updatedRecord) => {
    setStatusRecords((prev) =>
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
  const filteredRecords = statusRecords.filter(
    (record) =>
      record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.invoiceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.newStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">تغییر وضعیت</h1>
          <div className="flex items-center justify-between mt-1">
            <p className="text-white/60 text-sm">
              نمای کلی تغییر وضعیت کاربران
            </p>
            <div className="flex gap-3">
              <button className="btn-custom" onClick={handleAddNew}>
                جدید
                <span className="inline-block">
                  <HiOutlinePlusSm className="w-5 h-5" />
                </span>
              </button>
            
            </div>
          </div>
        </div>
      </div>

      <StatusFilter
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
        <StatusTable
          records={filteredRecords}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* Modals */}
      <ViewStatusModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        record={selectedRecord}
      />

      <EditStatusModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        record={selectedRecord}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
