import { useEffect, useMemo, useState } from "react";
import ProfileListUsers from "../components/ProfileListUsers";
import ProfileFormModal from "../components/ProfileFormModal";
import KeySettingsModal from "../components/KeySettingsModal";
import UserFormModal from "../components/UserFormModal";
import { errorMessage, successMessage } from "../utils/Toastiy";
import { ToastContainer } from "react-toastify";
import axiosClientAdmin from "../axios-clientAdmin";

export default function UsersPage() {
 const [records, setRecords] = useState([]);
 const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
 const [keyModalIndex, setKeyModalIndex] = useState(null);
 const [meta, setMeta] = useState({});
 const [pageCount, setPageCount] = useState(1);
 const [loading, setLoading] = useState(true);

 const [activeFilters, setActiveFilters] = useState({});
 const [keyModalData, setKeyModalData] = useState({
   id : "",
   moadian_username: "",
   tins: "",
   moadian_private_key: null,
   moadian_certificate: null,
 });


 const [users, setUsers] = useState([
   { id: 1, name: "حیدر شجاع", name2: "09376228320", side: "مدیر" },
 ]);
 const [isUserModalOpen, setIsUserModalOpen] = useState(false);
 const [editingUserIndex, setEditingUserIndex] = useState(null);
 const buildFilterQuery = (filters) => {
   const params = [];
   Object.entries(filters).forEach(([key, value]) => {
     if (value) {
       if (key === "type") {
         params.push(`${key}=${value}`);
       } else {
         params.push(`f[${key}]=${encodeURIComponent(value)}`);
       }
     }
   });
   return params.length ? "&" + params.join("&") : "";
 };
 const query = buildFilterQuery(activeFilters);
 const [userForm, setUserForm] = useState({
   username: "",
   fullName: "",
   role: "",
 });


 const fetchUsers = async () => {
   setLoading(true);
   try {
     const response = await axiosClientAdmin.get(`/users?page=${pageCount}${query}`);
     console.log(`response.data.data`, response.data.data);
     setRecords(response.data.data);
     setMeta(response.data.meta);
   } catch (error) {
     console.error("Error fetching data:", error);
   } finally {
     setLoading(false);
   }
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
   const newUser = {
     id: users[editingUserIndex]?.id ?? Date.now(),
     name: userForm.fullName,
     name2: userForm.username,
     side: userForm.role,
   };

   if (editingUserIndex !== null) {
     setUsers((prev) =>
       prev.map((u, i) => (i === editingUserIndex ? newUser : u))
     );
   } else {
     setUsers((prev) => [newUser, ...prev]);
   }

   setIsUserModalOpen(false);
 };

 const handleKeyModalTextChange = (e) => {
   const { name, value } = e.target;
   setKeyModalData((prev) => ({ ...prev, [name]: value }));
 };

 // تابع جدید برای ذخیره فایل با کلید صحیح
 const handleKeyModalFileChange = (e) => {
   const { name, files } = e.target;
   const file = files && files[0] ? files[0] : null;
   setKeyModalData((prev) => ({ ...prev, [name]: file }));
 };

 
 
 const handleSaveKeySettings = async () => {
   const formData = new FormData();
   formData.append('id', keyModalData.id);
   formData.append('tins', keyModalData.tins);
   formData.append('moadian_username', keyModalData.moadian_username);
 
   // اگر فایل انتخاب شده باشد
   if (keyModalData.moadian_private_key instanceof File) {
     formData.append('moadian_private_key', keyModalData.moadian_private_key);
   }
   if (keyModalData.moadian_certificate instanceof File) {
     formData.append('moadian_certificate', keyModalData.moadian_certificate);
   }
 
   try {
     const { data } = await axiosClient.put(
       `/admin/users/${keyModalData.id}`,
       formData,
       {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
       }
     );
     successMessage("کاربر با موفقیت ویرایش شد");
     setIsKeyModalOpen(false);
   } catch (error) {
     errorMessage("خطا در ویرایش کاربر");
     setIsKeyModalOpen(false);
   }
 };
 useEffect(() => {
   fetchUsers();
 }, [pageCount , activeFilters]);


 return (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
  
    
   

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
        users={records}
        onDelete={deleteUser}
        onEdit={openEditUser}
        onOpenKeySettings={openEditUser}
      />
    </div>

   

    <KeySettingsModal
      isOpen={isKeyModalOpen}
      data={keyModalData}
      onChangeText={handleKeyModalTextChange}
      onChangeFile={handleKeyModalFileChange}
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
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </div>
);
}
