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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative shadow-lg">
        <button
          className="absolute left-4 top-4 text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-right">
          دریافت لیست کالا/خدمات از اکسل
        </h2>
        <div className="flex items-center gap-4 mb-6">
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
            <span className="text-sm text-gray-600">{fileName}</span>
          )}
        </div>
        <div className="overflow-x-auto border rounded-lg bg-gray-50">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-indigo-900 text-white">
              <tr>
                {excelData[0]?.map((col, idx) => (
                  <th key={idx} className="py-2 px-3 border-b">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.length > 1 ? (
                excelData.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="py-1 px-2 border-b">
                        {cell ?? ""}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={excelData[0]?.length || 1}
                    className="py-4 text-gray-500"
                  >
                    رکوردی وجود ندارد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button className="btn-custom" onClick={onClose}>
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
