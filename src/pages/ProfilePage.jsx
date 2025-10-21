import { useEffect, useMemo, useState } from "react";
import ProfileRecordsTable from "../components/ProfileRecordsTable";
import ProfileListUsers from "../components/ProfileListUsers";
import ProfileFormModal from "../components/ProfileFormModal";
import KeySettingsModal from "../components/KeySettingsModal";
import UserFormModal from "../components/UserFormModal";
import { errorMessage, successMessage } from "../utils/Toastiy";
import { ToastContainer } from "react-toastify";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [records, setRecords] = useState([]);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyModalIndex, setKeyModalIndex] = useState(null);
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const initialFilters = {
    name: "",
    last_name: "",
  };
  const [filterInputs, setFilterInputs] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState({});
  const [keyModalData, setKeyModalData] = useState({
    id : "",
    moadian_username: "",
    tins: "",
    moadian_private_key: null,
    moadian_certificate: null,
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
  const isEditing = useMemo(() => editingIndex !== null, [editingIndex]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/admin/users?page=${pageCount}${query}`);
      setRecords(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const openForCreate = () => {
    setEditingIndex(null);
    setForm({
      name: "",
      tins: "",
      last_name: "",
      mobile: "",
      email: "",
      password: "",
      status: 100,
      sstids: "",
      roles: [],
      moadian_private_key: null,
      moadian_certificate: null,
      address: "",
      postal_code: "",
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
    const target = e.target;
    const { name, type } = target;

    // Handle checkbox groups for roles only
    if (name === "roles") {
      const valueAsNumber = Number(target.value);
      const isChecked = target.checked;
      setForm((prev) => {
        const currentArray = Array.isArray(prev[name]) ? prev[name] : [];
        if (isChecked) {
          if (currentArray.includes(valueAsNumber)) return prev;
          return { ...prev, [name]: [...currentArray, valueAsNumber] };
        }
        return {
          ...prev,
          [name]: currentArray.filter((n) => n !== valueAsNumber),
        };
      });
      return;
    }

    // Handle file inputs for moadian keys
    if (type === "file") {
      const file = target.files && target.files[0] ? target.files[0] : null;
      if (!file) {
        setForm((prev) => ({ ...prev, [name]: null }));
        return;
      }

      const lower = file.name.toLowerCase();
      if (
        (name === "moadian_private_key" && !lower.endsWith(".pem")) ||
        (name === "moadian_certificate" && !lower.endsWith(".crt"))
      ) {
        alert(
          name === "moadian_private_key"
            ? "فقط فایل با پسوند .pem مجاز است"
            : "فقط فایل با پسوند .crt مجاز است"
        );
        target.value = "";
        return;
      }
      setForm((prev) => ({ ...prev, [name]: file }));
      return;
    }

    // Default: text/number inputs
    const value = target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const preprocessed = { ...form };
      if (typeof preprocessed.mobile === "string") {
        const digits = preprocessed.mobile.replace(/\D/g, "");
        if (digits.length === 11 && digits.startsWith("09")) {
          preprocessed.mobile = digits.slice(1);
        } else {
          preprocessed.mobile = digits;
        }
      }

      

      // Convert sstids string to array if it exists
      if (preprocessed.sstids && String(preprocessed.sstids).length === 13) {
        preprocessed.sstids = [preprocessed.sstids];
      } else if (
        preprocessed.sstids &&
        String(preprocessed.sstids).length !== 13
      ) {
        alert("شناسه sstids باید ۱۳ رقم باشد");
        return;
      }

      if (typeof preprocessed.tins === "string") {
        preprocessed.tins = preprocessed.tins.replace(/\D/g, "");
      }
      if (!preprocessed.tins || String(preprocessed.tins).length !== 11) {
        alert("کد اقتصادی (tins) باید دقیقا ۱۱ رقم باشد.");
        return;
      }

      // Check for duplicates (only for create mode)
      if (!isEditing) {
        if (preprocessed.tins) {
          const existingTins = records.find(
            (record) => record.tins === preprocessed.tins
          );
          if (existingTins) {
            alert("کد اقتصادی مودی تکراری است. لطفاً کد دیگری وارد کنید.");
            return;
          }
        }

        if (preprocessed.email) {
          const existingEmail = records.find(
            (record) => record.email === preprocessed.email
          );
          if (existingEmail) {
            alert("ایمیل تکراری است. لطفاً ایمیل دیگری وارد کنید.");
            return;
          }
        }

        if (preprocessed.mobile) {
          const existingMobile = records.find(
            (record) => record.mobile === preprocessed.mobile
          );
          if (existingMobile) {
            alert("شماره موبایل تکراری است. لطفاً شماره دیگری وارد کنید.");
            return;
          }
        }
      }

      if (isEditing) {
        console.log("Constructed user edit:", {
          ...preprocessed,
          moadian_private_key: preprocessed.moadian_private_key?.name || null,
          moadian_certificate: preprocessed.moadian_certificate?.name || null,
        });

        const original = records[editingIndex];
        const merged = { ...original, ...preprocessed };

        // If any file is present, use FormData; otherwise JSON
        const hasFiles =
          merged.moadian_private_key instanceof File ||
          merged.moadian_certificate instanceof File;

        let payloadToSend = merged;
        let headers = undefined;

        if (hasFiles) {
          const fd = new FormData();
          Object.entries(merged).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if (value instanceof File) {
              fd.append(key, value);
              return;
            }
            if (Array.isArray(value)) {
              value.forEach((v) => fd.append(`${key}[]`, String(v)));
              return;
            }
            fd.append(key, String(value));
          });
          payloadToSend = fd;
          headers = { "Content-Type": "multipart/form-data" };
        } else {
          // Normalize roles array to numeric ids
          if (Array.isArray(payloadToSend?.roles)) {
            payloadToSend = {
              ...payloadToSend,
              roles: payloadToSend.roles
                .map((r) => (typeof r === "number" ? r : Number(r)))
                .filter((n) => Number.isFinite(n)),
            };
          }
        }

        const { data } = await axiosClient.put(
          `/admin/users/${form.id}`,
          payloadToSend,
          headers ? { headers } : undefined
        );
       
        successMessage("کاربر با موفقیت ویرایش شد");
        setRecords((prev) =>
          prev.map((record, index) =>
            index === editingIndex ? merged : record
          )
        );
        // Refetch users after successful update
        fetchUsers();
      } else {
        // Creating new user
        const hasFiles =
          preprocessed.moadian_private_key instanceof File ||
          preprocessed.moadian_certificate instanceof File;

        if (hasFiles) {
          const fd = new FormData();
          Object.entries(preprocessed).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if (value instanceof File) {
              fd.append(key, value);
              return;
            }
            if (Array.isArray(value)) {
              value.forEach((v) => fd.append(`${key}[]`, String(v)));
              return;
            }
            fd.append(key, String(value));
          });
          console.log("Submitting (multipart):", {
            ...preprocessed,
            moadian_private_key: preprocessed.moadian_private_key?.name || null,
            moadian_certificate: preprocessed.moadian_certificate?.name || null,
          });
          const res = await axiosClient.post(`/admin/users`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log(`res`, res);
          successMessage("کاربر با موفقیت ثبت شد");
          fetchUsers();
        } else {
          console.log("Submitting (JSON):", preprocessed);
          const res = await axiosClient.post(`/admin/users`, preprocessed);
          console.log(`res`, res);
          successMessage("کاربر با موفقیت ثبت شد");
          fetchUsers();
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
      const serverMsg = error?.response?.data?.message;
      const serverErrors = error?.response?.data?.errors;
      if (serverMsg || serverErrors) {
        alert(
          `${serverMsg || "خطا در ثبت"}\n${
            serverErrors ? JSON.stringify(serverErrors, null, 2) : ""
          }`
        );

        return;
      }
    } finally {
      setIsOpen(false);
    }
  };

  const deleteRecord = async (index) => {
    try {
      const user = records[index];
      console.log(`Deleting user:`, user);

      const res = await axiosClient.delete(`/admin/users/${user.id}`);
      console.log(`Delete response:`, res);

      setRecords((prev) => prev.filter((_, i) => i !== index));

      successMessage("کاربر با موفقیت حذف شد");
    } catch (error) {
      errorMessage("خطا در حذف کاربر");
    }
  };

  const openKeySettings = (index) => {
    setKeyModalIndex(index);
    const user = records[index];
    console.log(`user.id`, user.id);
    setKeyModalData({
      id: user.id,
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
      <div className="py-2 px-2 lg:px-7">
          <p className="text-white text-base mt-1"> اعمال فیلتر</p>
          <div className="rounded-xl border border-white/10 bg-white/5 mt-8 p-3 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-white text-sm">نام مودی</label>
              <input
                name="name"
                value={filterInputs.name}
                onChange={(e) =>
                  setFilterInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="block mb-1 text-white text-sm">
                نام حافظه مالیاتی
              </label>
              <input
                name="last_name"
                value={filterInputs.last_name}
                onChange={(e) =>
                  setFilterInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
           
          
          

            <div className="flex items-end justify-end w-full gap-2">
              <button
                className="btn-custom"
                onClick={() => {
                  setFilterInputs(initialFilters);
                  setActiveFilters({});
                }}
              >
                پاک کردین فیلترها
              </button>
              <button
                className="btn-custom"
                onClick={() => setActiveFilters({ ...filterInputs })}
              >
                ارسال فیلتر
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
          loading={loading}
         
        />
        <Pagination
        meta={meta}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
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
