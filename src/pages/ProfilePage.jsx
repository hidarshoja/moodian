import { useEffect, useMemo, useState } from "react";
import ProfileRecordsTable from "../components/ProfileRecordsTable";
import ProfileListUsers from "../components/ProfileListUsers";
import ProfileFormModal from "../components/ProfileFormModal";
import KeySettingsModal from "../components/KeySettingsModal";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [records, setRecords] = useState([]);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyModalIndex, setKeyModalIndex] = useState(null);
  const [keyModalData, setKeyModalData] = useState({
    taxMemoryUniqueId: "",
    newEconomicCode: "",
    privateKeyFile: null,
  });
  const [form, setForm] = useState({
    taxpayerName: "",
    taxMemoryName: "",
    taxMemoryCode: "",
    taxpayerEconomicCode: "",
    privateKey: "",
    address: "",
    postalCode: "",
    phone: "",
  });
  const [users, setUsers] = useState([
    {id: 1, name :"حیدر شجاع" , name2:"09376228320" , side:"مدیر" }
  ]);
  const isEditing = useMemo(() => editingIndex !== null, [editingIndex]);

  const openForCreate = () => {
    setEditingIndex(null);
    setForm({
      taxpayerName: "",
      taxMemoryName: "",
      taxMemoryCode: "",
      taxpayerEconomicCode: "",
      privateKey: "",
      address: "",
      postalCode: "",
      phone: "",
    });
    setIsOpen(true);
  };

  const openForEdit = (index) => {
    const rec = records[index];
    setEditingIndex(index);
    setForm({ ...rec });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setRecords((prev) =>
        prev.map((r, i) => (i === editingIndex ? { ...form } : r))
      );
    } else {
      setRecords((prev) => [{ ...form }, ...prev]);
    }
    setIsOpen(false);
  };

  const deleteRecord = (index) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  const openKeySettings = (index) => {
    const row = records[index];
    setKeyModalIndex(index);
    setKeyModalData({
      taxMemoryUniqueId: row?.taxMemoryCode || "",
      newEconomicCode: row?.taxpayerEconomicCode || "",
      privateKeyFile: null,
    });
    setIsKeyModalOpen(true);
  };

  const closeKeySettings = () => {
    setIsKeyModalOpen(false);
    setKeyModalIndex(null);
  };

  const handleKeyModalTextChange = (e) => {
    const { name, value } = e.target;
    setKeyModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrivateKeyFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setKeyModalData((prev) => ({ ...prev, privateKeyFile: file }));
  };

  const handleSaveKeySettings = () => {
    const payload = {
      rowIndex: keyModalIndex,
      taxMemoryUniqueId: keyModalData.taxMemoryUniqueId,
      newEconomicCode: keyModalData.newEconomicCode,
      privateKeyFileName: keyModalData.privateKeyFile?.name || null,
    };
    console.log("Tax system settings payload:", payload);
    setIsKeyModalOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/api/profile-records", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("failed");
        // const data = await res.json();
      } catch (_) {
        // ignore: فقط برای پیش‌نمایش UI از داده نمونه استفاده می‌کنیم
      }
      if (!isMounted) return;
      // سه درج پیاپی برای پیش‌نمایش جدول
      setRecords([
        {
          taxpayerName: "شرکت الف",
          taxMemoryName: "حافظه ۱",
          taxMemoryCode: "TM-1001",
          taxpayerEconomicCode: "EC-778899",
          privateKey: "-----BEGIN KEY-----AAA111...-----END KEY-----",
          address: "تهران، خیابان مثال، پلاک ۱۰",
          postalCode: "1234567890",
          phone: "021-12345678",
        },
      ]);
      setRecords((prev) => [
        ...prev,
        {
          taxpayerName: "شرکت ب",
          taxMemoryName: "حافظه ۲",
          taxMemoryCode: "TM-1002",
          taxpayerEconomicCode: "EC-112233",
          privateKey: "-----BEGIN KEY-----BBB222...-----END KEY-----",
          address: "مشهد، بلوار نمونه، کوچه ۵",
          postalCode: "9876543210",
          phone: "051-23456789",
        },
      ]);
      setRecords((prev) => [
        ...prev,
        {
          taxpayerName: "شرکت ج",
          taxMemoryName: "حافظه ۳",
          taxMemoryCode: "TM-1003",
          taxpayerEconomicCode: "EC-445566",
          privateKey: "-----BEGIN KEY-----CCC333...-----END KEY-----",
          address: "اصفهان، میدان نقش جهان، واحد ۱۲",
          postalCode: "4455667788",
          phone: "031-34567890",
        },
      ]);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold">پرفایل</h1>
              <p className="text-white/60 text-sm mt-1">
                نمای کلی اطلاعات کاربر
              </p>
            </div>
            <button
              onClick={openForCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 text-white border border-white/10 px-4 py-2 hover:bg-white/15 transition-colors"
            >
              <span className="text-sm">جدید +</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <ProfileRecordsTable
          records={records}
          onDelete={deleteRecord}
          onEdit={openForEdit}
          onOpenKeySettings={openKeySettings}
        />
      </div>
    
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold">لیست کاربران</h1>
              <p className="text-white/60 text-sm mt-1">
                نمای کلی لیست کاربران
              </p>
            </div>
            <button
              onClick={openForCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 text-white border border-white/10 px-4 py-2 hover:bg-white/15 transition-colors"
            >
              <span className="text-sm">جدید +</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <ProfileListUsers
          users={users}
          onDelete={deleteRecord}
          onEdit={openForEdit}
          onOpenKeySettings={openKeySettings}
        />
      </div>

      <ProfileFormModal
        isOpen={isOpen}
        isEditing={isEditing}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />

      <KeySettingsModal
        isOpen={isKeyModalOpen}
        data={keyModalData}
        onChangeText={handleKeyModalTextChange}
        onChangeFile={handlePrivateKeyFileChange}
        onSave={handleSaveKeySettings}
        onClose={closeKeySettings}
      />
    </div>
  );
}
