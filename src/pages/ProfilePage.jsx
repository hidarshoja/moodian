import { useEffect, useMemo, useState } from "react";
import ProfileRecordsTable from "../components/ProfileRecordsTable";
import ProfileListUsers from "../components/ProfileListUsers";
import ProfileFormModal from "../components/ProfileFormModal";
import KeySettingsModal from "../components/KeySettingsModal";
import UserFormModal from "../components/UserFormModal";
import axiosClient from "../axios-client";
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
    name: "",
    last_name: "",
    modian_username: "",
    tins: "",
    modian_privete: "",
    address: "",
    postal_code: "",
    mobile: "",
  });
  const [users, setUsers] = useState([
    { id: 1, name: "حیدر شجاع", name2: "09376228320", side: "مدیر" },
  ]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [userForm, setUserForm] = useState({
    username: "",
    fullName: "",
    role: "",
  });
  const isEditing = useMemo(() => editingIndex !== null, [editingIndex]);

  const openForCreate = () => {
    setEditingIndex(null);
    setForm({
      name: "",
      last_name: "",
      modian_username: "",
      tins: "",
      modian_privete: "",
      address: "",
      postal_code: "",
      mobile: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isEditing) {
        const original = records[editingIndex];
        const updated = { ...original, ...form ,   };
  
        const { data } = await axiosClient.put(`/admin/users/${form.id}`, updated);
        console.log("User updated:", data?.data);
        setRecords((prev) =>
          prev.map((record, index) =>
            index === editingIndex ? updated : record
          )
        );
      } else {
        setRecords((prev) => [{ ...form }, ...prev]);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsOpen(false);
    }
  };
  

  const deleteRecord = (index) => {
    console.log(`records[index]`, records[index]);
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

 
  const openCreateUser = () => {
    setEditingUserIndex(null);
    setUserForm({ username: "", fullName: "", role: "" });
    setIsUserModalOpen(true);
  };

  const openEditUser = (index) => {
    const u = users[index];
    setEditingUserIndex(index);
    setUserForm({
      username: u?.name2 || "",
      fullName: u?.name || "",
      role: u?.side || "",
    });
    setIsUserModalOpen(true);
  };

  const deleteUser = (index) => {
    console.log(`records[index]`, records[index]);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
  console.log(`form`, form);
  // axiosClient
  // .put(`/admin/users/${form.id} `, {form})
  // .then((response) => {
  //   console.log(response.data.data);
  // })
  // .catch((error) => {
  //   console.error("Error fetching data:", error);
  // });
    setIsUserModalOpen(false);
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
    axiosClient
      .get("/admin/users")
      .then((response) => {
        setRecords(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
            <button onClick={openForCreate} className="btn-custom">
              <span className="text-sm">جدید +</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto p-6">
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
            <button onClick={openCreateUser} className="btn-custom">
              <span className="text-sm">جدید +</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto p-6">
        <ProfileListUsers
          users={users}
          onDelete={deleteUser}
          onEdit={openEditUser}
          onOpenKeySettings={openEditUser}
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

      <UserFormModal
        isOpen={isUserModalOpen}
        isEditing={editingUserIndex !== null}
        form={{
          username: userForm.username,
          fullName: userForm.fullName,
          role: userForm.role,
        }}
        onChange={handleUserChange}
        onSubmit={handleSubmitUser}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
}
