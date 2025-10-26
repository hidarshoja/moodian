import { useCallback, useEffect, useState } from "react";
import axiosClientAdmin from "../axios-clientAdmin";
import RolesTable from "../components/RolesTable";
import RoleFormModal from "../components/RoleFormModal";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "../utils/Toastiy";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [permission , setPermission] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ name: "" });

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosClientAdmin.get(`/roles?page=${pageCount}`);
      setRoles(res.data.data);
      setMeta(res.data.meta ?? {});
    } catch (e) {
      // noop
    } finally {
      setLoading(false);
    }
  }, [pageCount]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axiosClientAdmin.get(`/permissions`);
        console.log("res.data", res.data);
        setPermission(res.data);
      } catch (err) {
        console.error("خطا در دریافت دسترسی‌ها:", err);
      }
    };
  
    fetchPermissions();
  }, []);
  

  const openCreate = () => {
    setEditingIndex(null);
    setForm({ name: "" });
    setIsModalOpen(true);
  };

  const openEdit = (index) => {
    setEditingIndex(index);
    setForm({ name: roles[index]?.name || "" });
    setIsModalOpen(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingIndex !== null) {
        const id = roles[editingIndex].id;
        await axiosClientAdmin.put(`/roles/${id}`, { name: form.name });
        successMessage("نقش با موفقیت ویرایش شد");
      } else {
        await axiosClientAdmin.post(`/roles`, { name: form.name });
        successMessage("نقش با موفقیت ایجاد شد");
      }
      setIsModalOpen(false);
      fetchRoles();
    } catch (err) {
      errorMessage("خطا در ذخیره نقش");
    }
  };

  const onDelete = async (index) => {
    const role = roles[index];
    const confirm = await Swal.fire({
      title: "حذف نقش؟",
      text: `نقش ${role?.name} حذف شود؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      background: "#111827",
      color: "#e5e7eb",
    });
    if (!confirm.isConfirmed) return;
    try {
      await axiosClientAdmin.delete(`/roles/${role.id}`);
      setRoles((prev) => prev.filter((_, i) => i !== index));
      successMessage("نقش حذف شد");
    } catch (err) {
      errorMessage("حذف نقش ناموفق بود");
    }
  };
console.log(`permission`, permission);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">نقش ها</h1>
            <p className="text-white/60 text-sm mt-1">نمای کلی نقش کاربران</p>
          </div>
          <button onClick={openCreate} className="btn-custom">
            <span className="text-sm">جدید +</span>
          </button>
        </div>
      </div>

      <div className="mx-auto p-6">
        <RolesTable roles={roles} onEdit={openEdit} onDelete={onDelete} />
      </div>

      {meta?.last_page && meta?.current_page ? (
        <Pagination
          meta={meta}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setLoading={setLoading}
        />
      ) : null}

      <RoleFormModal
        isOpen={isModalOpen}
        isEditing={editingIndex !== null}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={() => setIsModalOpen(false)}
        permission={permission}
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
