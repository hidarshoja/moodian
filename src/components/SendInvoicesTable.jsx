import Spinner from "../utils/Spinner";
import { formatDateToYMD } from "../utils/change-date";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import EditInvoiceModal from "./EditInvoiceModal";
import { useState } from "react";
import PropTypes from "prop-types";
import { convertJalaliDatetimeToGregorian } from "../utils/change-date";

export default function SendInvoicesTable({ records, loading, onRefresh }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: "",
    status: "",
    tax_number: "",
    customer_name: "",
    customer_last_name: "",
    customer_id: "",
    inty: "",
    inp: "",
    ins: "",
    indatim: "",
    indati2m: "",
    product_id: "",
    am: "",
    fee: "",
    cfee: "",
    exr: "",
    dis: "",
  });

  const handleDelete = async (row) => {
    try {
      const res = await axiosClient.delete(`/invoices/${row.id}`);
      console.log(`Delete response:`, res);

      //  setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success", // یا 'error'
        title: "محصول با موفقیت حذف شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "خطا در حذف محصول",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  const handleEdit = (row) => {
    // Extract item values from first item if exists
    const firstItem =
      row.items && Array.isArray(row.items) && row.items.length > 0
        ? row.items[0]
        : {};

    setForm({
      id: row.id || "",
      status: row.status || "",
      tax_number: row.ins_label || "",
      customer_name: row.customer?.name || "",
      customer_last_name: row.customer?.last_name || "",
      customer_id: row.customer?.id || "",
      inty: row.inty || "",
      inp: row.inp || "",
      ins: row.ins || "",
      indatim: row.indatim || "",
      indati2m: row.indati2m || "",
      product_id: firstItem.product_id || "",
      am: firstItem.am || "",
      fee: firstItem.fee || "",
      cfee: firstItem.cfee || "",
      exr: firstItem.exr || "",
      dis: firstItem.dis || "",
    });
    setIsEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const insValue =
        form.ins && String(form.ins).trim() !== "" ? form.ins : 1;

      const payload = {
        id: form.id,
        status: form.status,
        tax_number: form.tax_number,
        customer_name: form.customer_name,
        customer_last_name: form.customer_last_name,
        customer_id: form.customer_id,
        inty: form.inty,
        inp: form.inp,
        ins: insValue,
        indatim: convertJalaliDatetimeToGregorian(form.indatim),
        indati2m: convertJalaliDatetimeToGregorian(form.indati2m),
        items: [
          {
            product_id: form.product_id ? Number(form.product_id) : 1,
            am: form.am ? Number(form.am) : 1,
            nw: null,
            fee: form.fee ? Number(form.fee) : 900000,
            cfee: form.cfee ? Number(form.cfee) : 1,
            cut: null,
            exr: form.exr ? Number(form.exr) : 2,
            ssrv: null,
            sscv: null,
            dis: form.dis ? Number(form.dis) : 0,
            consfee: null,
            spro: null,
            bros: null,
            bsrn: null,
            cui: null,
            cpr: null,
            sovat: null,
          },
        ],
      };

      await axiosClient.put(`/invoices/${form.id}`, payload);

      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "فاکتور با موفقیت ویرایش شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });

      // Refresh the data
      if (onRefresh) {
        onRefresh();
      }

      setIsEditModalOpen(false);
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "خطا در ویرایش فاکتور",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setForm({
      id: "",
      status: "",
      tax_number: "",
      customer_name: "",
      customer_last_name: "",
      customer_id: "",
      inty: "",
      inp: "",
      ins: "",
      indatim: "",
      indati2m: "",
      product_id: "",
      am: "",
      fee: "",
      cfee: "",
      exr: "",
      dis: "",
    });
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          <Spinner />
        </div>
      )}
      <table
        className={`min-w-full text-white ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap"> وضعیت </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              شماره منحصر به فرد مالیاتی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">مشتری</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              تاریخ صدور
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">مبلغ کل</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">نوع</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-6 text-center text-white/60 text-sm"
              >
                موردی ثبت نشده است.
              </td>
            </tr>
          )}
          {records.map((r, i) => (
            <tr
              key={i}
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.status_label}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.inp === 1 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.customer?.name} {r?.customer?.last_name}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {formatDateToYMD(r.created_at)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {r.inp === 4 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                {r.asn}
              </td>

              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-red-500/20 text-red-500"
                    onClick={() => handleDelete(r)}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                    onClick={() => handleEdit(r)}
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditInvoiceModal
        isOpen={isEditModalOpen}
        isEditing={true}
        form={form}
        onChange={handleFormChange}
        onSubmit={handleSubmitEdit}
        onClose={closeEditModal}
      />
    </div>
  );
}

SendInvoicesTable.propTypes = {
  records: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
