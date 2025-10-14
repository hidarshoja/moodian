import { useState, useEffect } from "react";
import CancelFilter from "../components/CancelFilter";
import CancelTable from "../components/CancelTable";
import ViewCancelModal from "../components/ViewCancelModal";
import EditCancelModal from "../components/EditCancelModal";
import AddCancelModal from "../components/AddCancelModal";
import { HiOutlinePlusSm } from "react-icons/hi";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";

export default function CancelPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [toYear, setToYear] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cancelRecords, setCancelRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    // &f[ins]=3
    axiosClient
      .get(`/invoices?page=${pageCount}`)
      .then((response) => {
        setCancelRecords(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh, pageCount]);

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

  const handleDelete = async (row) => {
    console.log(`row.id`, row.id);
    try {
      const res = await axiosClient.delete(`/invoices/${row.id}`);
      console.log(`Delete response:`, res);

      //  setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success", // یا 'error'
        title: "فاکتور با موفقیت حذف شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "خطا در ابطال ",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModalOpen(true);
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

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddCancel = (data) => {
    console.log("Adding cancel record:", data);
    // Here you can add the logic to save the new cancel record
    // For now, just show a success message
    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "success",
      title: "رکورد ابطال با موفقیت اضافه شد",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-toast",
      },
    });
    setRefresh(!refresh);
  };

  // Filter records based on search term

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div className="flex items-center justify-between w-full p-6 border-b border-white/10">
        <div className="w-1/2  p-6">
          <h1 className="text-white text-2xl font-bold">ابطال</h1>
          <div className="flex items-center justify-between mt-1">
            <p className="text-white/60 text-sm">نمای کلی ابطال فاکتورها</p>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-end ">
          <button className="btn-custom" onClick={() => setAddModalOpen(true)}>
            جدید +
          </button>
        </div>
      </div>
      {/* 
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
          setRefresh={setRefresh}
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

      <AddCancelModal
        isOpen={addModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddCancel}
      />
    </div>
  );
}
