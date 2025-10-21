import { useEffect, useState, useCallback } from "react";
import ProfileListUsers from "../components/ProfileListUsers";
import KeySettingsModal from "../components/KeySettingsModal";
import UserFormModal from "../components/UserFormModal";
import { errorMessage, successMessage } from "../utils/Toastiy";
import { ToastContainer } from "react-toastify";
import axiosClientAdmin from "../axios-clientAdmin";

export default function UsersPage() {
  const [records, setRecords] = useState([]);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [pageCount] = useState(1);

  const [activeFilters] = useState({});
  const [keyModalData, setKeyModalData] = useState({
    id: "",
    moadian_username: "",
    tins: "",
    moadian_private_key: null,
    moadian_certificate: null,
  });

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
    name: "",
    last_name: "",
    tins: "",
    mobile: "",
    email: "",
    password: "",
    status: "",
    sstids: [""],
    roles: [],
    moadian_username: "",
    moadian_private_key: null,
    moadian_certificate: null,
    address: "",
    postal_code: "",
  });

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axiosClientAdmin.get(
        `/users?page=${pageCount}${query}`
      );
      console.log(`response.data.data`, response.data.data);
      setRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [pageCount, query]);

  const closeKeySettings = () => {
    setIsKeyModalOpen(false);
  };

  const openCreateUser = () => {
    setEditingUserIndex(null);
    setUserForm({
      name: "",
      last_name: "",
      tins: "",
      mobile: "",
      email: "",
      password: "",
      status: 100,
      sstids: "",
      roles: [],
      moadian_username: "",
      moadian_private_key: null,
      moadian_certificate: null,
      address: "",
      postal_code: "",
    });
    setIsUserModalOpen(true);
  };

  const openEditUser = (index) => {
    const u = records[index];
    setEditingUserIndex(index);
    setUserForm({
      name: u?.name || "",
      last_name: u?.last_name || "",
      tins: u?.tins || "",
      mobile: u?.mobile || "",
      email: u?.email || "",
      password: "",
      status: u?.status || 100,
      sstids: u?.sstids || "",
      roles: u?.roles?.map((role) => role.id) || [],
      moadian_username: u?.moadian_username || "",
      moadian_private_key: null,
      moadian_certificate: null,
      address: u?.address || "",
      postal_code: u?.postal_code || "",
    });
    setIsUserModalOpen(true);
  };

  const deleteUser = (index) => {
    console.log(`records[index]`, records[index]);
  };

  const handleUserChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      const file = files && files[0] ? files[0] : null;
      setUserForm((p) => ({ ...p, [name]: file }));
    } else if (type === "checkbox" && name === "roles") {
      const currentRoles = userForm.roles || [];
      const roleValue = parseInt(value);
      let newRoles;

      if (checked) {
        newRoles = [...currentRoles, roleValue];
      } else {
        newRoles = currentRoles.filter((role) => role !== roleValue);
      }

      setUserForm((p) => ({ ...p, [name]: newRoles }));
    } else {
      setUserForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // اضافه کردن فیلدهای متنی
      formData.append("name", userForm.name);
      formData.append("last_name", userForm.last_name);
      formData.append("tins", userForm.tins);
      formData.append("mobile", userForm.mobile);
      formData.append("email", userForm.email);
      formData.append("password", userForm.password);
      formData.append("status", userForm.status);
      formData.append("moadian_username", userForm.moadian_username);
      formData.append("address", userForm.address);
      formData.append("postal_code", userForm.postal_code);

      // اضافه کردن sstids
      if (userForm.sstids && userForm.sstids.trim()) {
        formData.append("sstids[0]", userForm.sstids);
      }

      // اضافه کردن roles
      userForm.roles.forEach((role, index) => {
        formData.append(`roles[${index}]`, role);
      });

      // اضافه کردن فایل‌ها
      if (userForm.moadian_private_key instanceof File) {
        formData.append("moadian_private_key", userForm.moadian_private_key);
      }
      if (userForm.moadian_certificate instanceof File) {
        formData.append("moadian_certificate", userForm.moadian_certificate);
      }

      if (editingUserIndex !== null) {
        // ویرایش کاربر موجود
        await axiosClientAdmin.put(
          `/users/${records[editingUserIndex].id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        successMessage("کاربر با موفقیت ویرایش شد");
      } else {
        // ایجاد کاربر جدید
        await axiosClientAdmin.post("/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        successMessage("کاربر با موفقیت ایجاد شد");
      }

      setIsUserModalOpen(false);
      fetchUsers(); // بارگذاری مجدد لیست کاربران
    } catch (error) {
      console.error("Error saving user:", error);
      errorMessage("خطا در ذخیره کاربر");
    }
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
    formData.append("id", keyModalData.id);
    formData.append("tins", keyModalData.tins);
    formData.append("moadian_username", keyModalData.moadian_username);

    // اگر فایل انتخاب شده باشد
    if (keyModalData.moadian_private_key instanceof File) {
      formData.append("moadian_private_key", keyModalData.moadian_private_key);
    }
    if (keyModalData.moadian_certificate instanceof File) {
      formData.append("moadian_certificate", keyModalData.moadian_certificate);
    }

    try {
      await axiosClientAdmin.put(`/admin/users/${keyModalData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successMessage("کاربر با موفقیت ویرایش شد");
      setIsKeyModalOpen(false);
    } catch (error) {
      errorMessage("خطا در ویرایش کاربر");
      setIsKeyModalOpen(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
        form={userForm}
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
