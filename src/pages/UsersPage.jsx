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
      sstids: Array.isArray(u?.sstids) ? u.sstids[0] || "" : u?.sstids || "",
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

    console.log("Form data:", userForm);
    console.log("Editing user index:", editingUserIndex);
    console.log("User ID:", records[editingUserIndex]?.id);

    try {
      const formData = new FormData();

      // اضافه کردن فیلدهای متنی
      formData.append("name", userForm.name || "");
      formData.append("last_name", userForm.last_name || "");
      formData.append("tins", userForm.tins || "");
      formData.append("mobile", userForm.mobile || "");
      formData.append("email", userForm.email || "");
      formData.append("password", userForm.password || "");
      formData.append("status", userForm.status || 100);
      formData.append("moadian_username", userForm.moadian_username || "");
      formData.append("address", userForm.address || "");
      formData.append("postal_code", userForm.postal_code || "");

      // اضافه کردن sstids
      if (userForm.sstids) {
        // اگر sstids آرایه است
        if (Array.isArray(userForm.sstids)) {
          userForm.sstids.forEach((sstid, index) => {
            if (sstid && sstid.trim()) {
              formData.append(`sstids[${index}]`, sstid);
            }
          });
        }
        // اگر sstids رشته است
        else if (
          typeof userForm.sstids === "string" &&
          userForm.sstids.trim()
        ) {
          formData.append("sstids[0]", userForm.sstids);
        }
      }

      // اضافه کردن roles
      if (
        userForm.roles &&
        Array.isArray(userForm.roles) &&
        userForm.roles.length > 0
      ) {
        userForm.roles.forEach((role, index) => {
          if (role !== null && role !== undefined) {
            formData.append(`roles[${index}]`, role);
          }
        });
      }

      // اضافه کردن فایل‌ها
      if (userForm.moadian_private_key instanceof File) {
        formData.append("moadian_private_key", userForm.moadian_private_key);
      }
      if (userForm.moadian_certificate instanceof File) {
        formData.append("moadian_certificate", userForm.moadian_certificate);
      }

      // Debug: نمایش محتویات FormData
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      if (editingUserIndex !== null) {
        // ویرایش کاربر موجود - اضافه کردن _method: PUT
        formData.append("_method", "PUT");
        const userId = records[editingUserIndex].id;
        console.log("Updating user with ID:", userId);

        const response = await axiosClientAdmin.post(
          `/users/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Update response:", response);
        successMessage("کاربر با موفقیت ویرایش شد");
      } else {
        // ایجاد کاربر جدید
        console.log("Creating new user");
        const response = await axiosClientAdmin.post("/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Create response:", response);
        successMessage("کاربر با موفقیت ایجاد شد");
      }

      setIsUserModalOpen(false);
      fetchUsers(); // بارگذاری مجدد لیست کاربران
    } catch (error) {
      console.error("Error saving user:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);

      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        if (errors.tins) {
          errorMessage("کد اقتصادی قبلاً ثبت شده است");
        } else if (errors.email) {
          errorMessage("ایمیل قبلاً ثبت شده است");
        } else {
          errorMessage("خطا در اعتبارسنجی داده‌ها");
        }
      } else if (error.response?.status === 404) {
        errorMessage("کاربر مورد نظر یافت نشد");
      } else if (error.response?.status === 500) {
        errorMessage("خطای سرور");
      } else {
        errorMessage(`خطا در ذخیره کاربر: ${error.message}`);
      }
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
