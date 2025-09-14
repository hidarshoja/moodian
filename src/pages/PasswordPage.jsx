import { useState } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordHistoryTable from "../components/PasswordHistoryTable";
import ViewPasswordModal from "../components/ViewPasswordModal";
import { GrDocumentExcel } from "react-icons/gr";
import { FaShieldAlt, FaHistory } from "react-icons/fa";

export default function PasswordPage() {
  const [activeTab, setActiveTab] = useState("change");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [passwordHistory, setPasswordHistory] = useState([
    {
      id: 1,
      username: "admin",
      reason: "تغییر دوره‌ای رمز عبور",
      status: "موفق",
      requestDate: "1403/01/20",
      changeDate: "1403/01/20",
      ipAddress: "192.168.1.100",
      notes: "تغییر رمز عبور با موفقیت انجام شد",
    },
    {
      id: 2,
      username: "user1",
      reason: "فراموشی رمز عبور",
      status: "ناموفق",
      requestDate: "1403/01/18",
      changeDate: null,
      ipAddress: "192.168.1.101",
      errorMessage: "رمز عبور فعلی نادرست است",
    },
    {
      id: 3,
      username: "user2",
      reason: "امنیت حساب کاربری",
      status: "در انتظار تایید",
      requestDate: "1403/01/15",
      changeDate: null,
      ipAddress: "192.168.1.102",
      notes: "در انتظار تایید مدیر سیستم",
    },
  ]);

  const handlePasswordChange = (formData) => {
    console.log("Password change request:", formData);
    // Add new record to history
    const newRecord = {
      id: passwordHistory.length + 1,
      username: "current_user", // This would come from auth context
      reason: formData.reason,
      status: "در انتظار تایید",
      requestDate: new Date().toLocaleDateString("fa-IR"),
      changeDate: null,
      ipAddress: "192.168.1.100", // This would be detected
      notes: "درخواست تغییر رمز عبور ارسال شد",
    };
    setPasswordHistory((prev) => [newRecord, ...prev]);
    alert("درخواست تغییر رمز عبور با موفقیت ارسال شد");
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setViewModalOpen(true);
  };



  const handleDelete = (record) => {
    console.log("Delete record:", record);
    setPasswordHistory((prev) => prev.filter((r) => r.id !== record.id));
  };

  const handleExportExcel = () => {
    console.log("Export to Excel");
    // Implement export functionality
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">تغییر رمز عبور</h1>
          <div className="flex items-center justify-between mt-1">
            <p className="text-white/60 text-sm">
              مدیریت رمز عبور و تاریخچه تغییرات
            </p>
            <div className="flex gap-3">
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

      {/* Tabs */}
      <div className="mt-6">
        <div className="flex gap-5 space-x-1 bg-white/5 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab("change")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
              activeTab === "change"
                ? "btn-custom2"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <FaShieldAlt className="w-5 h-5" />
            تغییر رمز عبور
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
              activeTab === "history"
                ? "btn-custom2"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <FaHistory className="w-5 h-5" />
            تاریخچه تغییرات
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "change" && (
          <div className="w-full mx-auto">
            <PasswordForm
              onSubmit={handlePasswordChange}
              onCancel={() => setActiveTab("history")}
            />
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <PasswordHistoryTable
              records={passwordHistory}
              onView={handleView}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <ViewPasswordModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        record={selectedRecord}
      />
    </div>
  );
}
