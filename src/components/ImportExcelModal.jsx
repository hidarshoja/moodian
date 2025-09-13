import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

export default function ImportExcelModal({ isOpen, onClose }) {
  const fileInputRef = useRef();
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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
          دریافت لیست کالا/خدمات از اکسل
        </h2>
        <div className="flex items-center mb-3 justify-between">
          <div className="flex items-center gap-4  pr-2">
            <button
              className="btn-custom"
              onClick={() => fileInputRef.current.click()}
            >
              انتخاب فایل
            </button>
            <input
              type="file"
              accept=".xlsx,.xls"
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
          <div className="flex flex-col md:flex-row gap-2 my-1">
            <button className="btn-custom">بارگذاری</button>
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
