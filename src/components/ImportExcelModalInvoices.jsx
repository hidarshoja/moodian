import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

export default function ImportExcelModalInvoices({ isOpen, onClose }) {
  const fileInputRef = useRef();
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [inpData , setInpData] = useState(null);
  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only allow .xlsx
    const isXlsx = file.name.toLowerCase().endsWith(".xlsx");
    if (!isXlsx) {
      setFileName("");
      setSelectedFile(null);
      Swal.fire({
        icon: "error",
        title: "پسوند فایل نامعتبر است",
        text: "لطفاً فقط فایل با پسوند .xlsx انتخاب کنید.",
        background: "#0a0a22",
        color: "#e5e7eb",
        confirmButtonColor: "#1f2937",
      });
      // reset input value so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFileName(file.name);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setExcelData(data);
    };
    reader.readAsBinaryString(file);
  };

  const  handelInpChange = (e) => {
    setInpData(e.target.value);
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "ابتدا فایل را انتخاب کنید",
        background: "#0a0a22",
        color: "#e5e7eb",
        confirmButtonColor: "#1f2937",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("excel", selectedFile);
      formData.append("inp", inpData);
      await axiosClient.post(`/invoices/import`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "فایل با موفقیت بارگذاری شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: { popup: "swal2-toast" },
        background: "#111827",
        color: "#e5e7eb",
      });
      onClose();
      // reset state after successful upload
      setSelectedFile(null);
      setFileName("");
      setExcelData([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا در بارگذاری فایل",
        text: error?.response?.data?.message || "دوباره تلاش کنید",
        background: "#0a0a22",
        color: "#e5e7eb",
        confirmButtonColor: "#1f2937",
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/40"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-5xl p-4 rounded-2xl bg-[#0a0a22] border border-white/10 shadow-2xl relative animate-slideIn">
        <button
          className="absolute left-4 top-4 text-white text-2xl hover:bg-white/10 transition rounded-full w-10 h-10 flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-right border-b border-white/10 pb-3 pr-2">
          دریافت لیست فاکتور فروش از اکسل
        </h2>
        <div className="flex items-center mb-3 justify-between">
         <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
           <div className="flex items-center gap-4  pr-2">
            <button
              className="btn-custom"
              onClick={() => fileInputRef.current.click()}
            >
              انتخاب فایل
            </button>
            <input
              type="file"
              accept=".xlsx"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            {fileName && (
              <span className="text-sm text-indigo-200 font-medium">
                {fileName}
              </span>
            )}
          </div>
          <div>
            
            <select
              name="inp"
              value={inpData || ""}
              onChange={handelInpChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-1 focus:outline-none focus:ring-2 `}
            >
              <option value="">انتخاب الگوی صورتحساب(inp)</option>
              <option value="1">الگوی اول (فروش)</option>
              <option value="2">الگوی دوم (فروش ارزی)</option>
              <option value="3">
                الگوی سوم (صورتحساب طلا، جواهر و پلاتین){" "}
              </option>
              <option value="4">الگوی چهارم (قرارداد پیمانکاری) </option>
              <option value="5">الگوی پنجم (قبوض خدماتی)</option>
              <option value="6">الگوی ششم (بلیط هواپیما)</option>
              <option value="7">الگوی هفتم (صادرات)</option>
              <option value="8">الگوی هشتم (بارنامه)</option>
              <option value="11">
                الگوی یازدهم (بورس اوراق بهادار مبتنی بر کالا){" "}
              </option>
              <option value="13">الگوی سیزدهم (فروش خدمات بیمهای)</option>
            </select>
            
          </div>
         </div>
          <div className="flex flex-col md:flex-row gap-2 my-1">
            <button className="btn-custom" onClick={handleImport}>
              بارگذاری
            </button>
            <button className="btn-custom">فایل نمونه</button>
          </div>
        </div>
        <div
          className="overflow-x-auto rounded-xl bg-[#23234a] border border-white/10 shadow-inner nice-scrollbar"
          style={{ maxHeight: 250, overflowY: "auto" }}
        >
          <table className="min-w-full text-sm text-center font-vazir text-white">
            <thead className="bg-gradient-to-b from-gray-900 to-gray-800 text-indigo-100 sticky top-0 z-10">
              <tr>
                {excelData[0]?.map((col, idx) => (
                  <th
                    key={idx}
                    className="py-3 px-4 border-b border-white/10 font-bold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.length > 1 ? (
                excelData.slice(1).map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-indigo-900/30 transition border-b border-white/5"
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="py-2 px-3 ">
                        {cell ?? ""}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={excelData[0]?.length || 1}
                    className="py-6 text-indigo-200 text-lg"
                  >
                    رکوردی وجود ندارد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-8">
          <button
            className="btn-custom bg-gradient-to-l from-indigo-700 to-indigo-500 text-white shadow-md hover:scale-105 transition px-8 py-2 rounded-lg font-bold"
            onClick={onClose}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}

ImportExcelModalInvoices.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
