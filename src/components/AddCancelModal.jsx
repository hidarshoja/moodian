import { useState } from "react";
import DateObject from "react-date-object";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaTimes } from "react-icons/fa";
import axiosClient from "../axios-client";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import persianToGregorianString   from "../utils/persianToGregorianString"



export default function AddCancelModal({ isOpen, onClose, setRefresh , refresh }) {
  const [taxReferenceNumber, setTaxReferenceNumber] = useState("");
  const [issuanceDate, setIssuanceDate] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (taxReferenceNumber.trim() && issuanceDate) {
      const data = {
        taxid: taxReferenceNumber,
        indatim: persianToGregorianString(issuanceDate),
      };
    
      try {
        const res = await axiosClient.post(`/invoices/cancel-external`, data);
      
        setTaxReferenceNumber("");
        setIssuanceDate(new Date());
        onClose();
        setRefresh(!refresh);
      } catch (error) {
        let msg = "خطا در ارسال درخواست.";
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            msg = error.response.data.message;
          }
          if (error.response.data.errors) {
            Object.entries(error.response.data.errors).forEach(
              ([field, arr]) => {
                msg += `\n${field}: ${arr.join(", ")}`;
              }
            );
          }
        }
        Swal.fire({
          icon: "error",
          title: "خطا",
          html: msg.replace(/\n/g, "<br />"),
        });
      }
    }
  };

  const handleCancel = () => {
    setTaxReferenceNumber("");
    setIssuanceDate(new Date());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
      <div className="w-full max-w-2xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn min-h-96 max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl flex-shrink-0">
          <h2 className="text-sm md:text-lg font-semibold text-white">
            ابطال فاکتور فروشهای ارسال شده ی خارج از تجربه
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div>
            {/* Issuance Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                تاریخ صدور
              </label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={issuanceDate}
                onChange={setIssuanceDate}
                calendarPosition="bottom-right"
                inputClass="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                format="YYYY/MM/DD HH:mm:ss"
                required
              />
            </div>
            {/* Tax Reference Number Input */}
            <div className="mt-12">
              <label className="block text-sm font-medium text-gray-100 mb-2">
                شماره منحصر بفرد مالیاتی مرجع
              </label>
              <input
                type="text"
                value={taxReferenceNumber}
                onChange={(e) => setTaxReferenceNumber(e.target.value)}
                className={`w-full bg-gray-800/70 text-white/90 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  taxReferenceNumber && taxReferenceNumber.length < 22
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="شماره منحصر بفرد مالیاتی مرجع را وارد کنید"
                required
              />
              {/* فقط اگر کاربر شروع به تایپ کرد و مقدار اینپوت خالی نیست، پیام ولیدیشن نمایش داده شود */}
              {taxReferenceNumber !== "" && (
                <div
                  className={`text-xs mt-1 ${
                    taxReferenceNumber.length < 22
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  حتماً ۲۲ رقم باشد
                </div>
              )}
            </div>
          </div>

          {/* نمایش پیام خطا */}
          {errorMsg && (
            <div className="mt-3 text-sm text-red-500 bg-red-100 rounded px-3 py-2">
              {errorMsg.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-16 mb-16">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              انصراف
            </button>
            <button type="submit" className="btn-custom4">
              ابطال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddCancelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};
