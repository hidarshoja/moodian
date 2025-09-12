import {  useState } from "react";
import ServicesComponetTable from "../components/ServicesComponetTable";

export default function ServicesPage() {
  const [records, setRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [keyModalIndex, setKeyModalIndex] = useState(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
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
  const [keyModalData, setKeyModalData] = useState({
    taxMemoryUniqueId: "",
    newEconomicCode: "",
    privateKeyFile: null,
  });

  const deleteRecord = (index) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };
  const openForEdit = (index) => {
    const rec = records[index];
    setEditingIndex(index);
    setForm({ ...rec });
    setIsOpen(true);
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
    <div>
      <div className="w-full border-b border-white/10 p-6">
        <h1 className="text-white text-2xl font-bold">کالا و خدمات</h1>
        <p className="text-white/60 text-sm mt-1">نمای کلی کالا و خدمات </p>
      </div>
    </div>
    <div className="mx-auto p-6">
        <ServicesComponetTable
          records={records}
          onDelete={deleteRecord}
          onEdit={openForEdit}
          onOpenKeySettings={openKeySettings}
        />
      </div>
  </div>
  )
}
