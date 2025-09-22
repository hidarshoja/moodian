import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import axiosClient from "../axios-client";

export default function EditInvoiceModal({
  isOpen,
  isEditing,
  form,
  onChange,
  onSubmit,
  onClose,
}) {
  const [errors, setErrors] = useState({});
  const [dataCustomers, setDataCustomers] = useState([]);
  // Validation functions
  const validateCustomerId = (customerId) => {
    if (!customerId) return "شناسه مشتری الزامی است";
    const idNum = Number(customerId);
    if (isNaN(idNum) || idNum <= 0) {
      return "شناسه مشتری باید عدد مثبت باشد";
    }
    return "";
  };

  const validateInty = (inty) => {
    if (!inty) return "نوع فاکتور الزامی است";
    const validIntyValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Valid inty values
    const intyNum = Number(inty);
    if (isNaN(intyNum) || !validIntyValues.includes(intyNum)) {
      return "نوع فاکتور نامعتبر است";
    }
    return "";
  };

  useEffect(() => {
    axiosClient
      .get(`/customers`)
      .then((response) => {
        setDataCustomers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    const customerIdError = validateCustomerId(form.customer_id);
    if (customerIdError) newErrors.customer_id = customerIdError;

    const intyError = validateInty(form.inty);
    if (intyError) newErrors.inty = intyError;

    setErrors(newErrors);
  }, [form.customer_id, form.tax_number, form.inty]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
      <div className="w-full max-w-2xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl flex-shrink-0">
          <h3 className="text-white font-semibold">
            {isEditing ? "ویرایش فاکتور" : "افزودن فاکتور"}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>
        <form
          onSubmit={(e) => {
            // Check for validation errors before submitting
            const hasErrors = Object.keys(errors).length > 0;
            if (hasErrors) {
              e.preventDefault();
              alert("لطفاً خطاهای موجود را برطرف کنید");
              return;
            }
            onSubmit(e);
          }}
          className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1"
        >
          <div>
            <label className="block mb-1 text-white text-sm">
              تاریخ صدور (indatim)
            </label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={form.indatim}
              onChange={(date) => {
                const formattedDate = date
                  ? date.format("YYYY-MM-DD HH:mm:ss")
                  : "";
                onChange({
                  target: {
                    name: "indatim",
                    value: formattedDate,
                  },
                });
              }}
              calendarPosition="bottom-right"
              inputClass="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              تاریخ تحویل (indati2m)
            </label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={form.indati2m}
              onChange={(date) => {
                const formattedDate = date
                  ? date.format("YYYY-MM-DD HH:mm:ss")
                  : "";
                onChange({
                  target: {
                    name: "indati2m",
                    value: formattedDate,
                  },
                });
              }}
              calendarPosition="bottom-right"
              inputClass="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>{" "}
          <div>
            <label className="block mb-1 text-white text-sm">شناسه مشتری</label>
            <select
              name="customer_id"
              value={form.customer_id || ""}
              onChange={onChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.customer_id
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            >
              <option value="">انتخاب مشتری</option>
              {dataCustomers.map((customer) => (
                <option key={customer.id} value={String(customer.id)}>
                  {`${customer.name || ""} ${customer.last_name || ""}`.trim()}
                </option>
              ))}
            </select>
            {errors.customer_id && (
              <p className="text-red-400 text-xs mt-1">{errors.customer_id}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نوع فاکتور (inty)
            </label>
            <select
              name="inty"
              value={form.inty || ""}
              onChange={onChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.inty
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            >
              <option value="">انتخاب نوع فاکتور</option>
              <option value="1">صورتحساب الکترونیکی نوع اول</option>
              <option value="2">صورتحساب الکترونیکی نوع دوم</option>
              <option value="3">صورتحساب الکترونیکی نوع سوم</option>
            </select>
            {errors.inty && (
              <p className="text-red-400 text-xs mt-1">{errors.inty}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              الگوی صورتحساب (inp)
            </label>
            <select
              name="inp"
              value={form.inp || ""}
              onChange={onChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.inp
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            >
              <option value="">انتخاب الگوی صورتحساب</option>
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
            {errors.inp && (
              <p className="text-red-400 text-xs mt-1">{errors.inp}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              موضوع صورتحساب (ins)
            </label>
            <select
              name="ins"
              value={form.ins || ""}
              onChange={onChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.ins
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            >
              <option value="">انتخاب موضوع صورتحساب</option>
              <option value="1">اصلی</option>
              <option value="2">اصلاحی</option>
              <option value="3">ابطالی</option>
              <option value="4">برگشت از فروش</option>
            </select>
            {errors.ins && (
              <p className="text-red-400 text-xs mt-1">{errors.ins}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              شناسه محصول (product_id)
            </label>
            <input
              type="number"
              name="product_id"
              value={form.product_id || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">تعداد (am)</label>
            <input
              type="number"
              name="am"
              value={form.am || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              قیمت واحد (fee)
            </label>
            <input
              type="number"
              name="fee"
              value={form.fee || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              ضریب قیمت (cfee)
            </label>
            <input
              type="number"
              name="cfee"
              value={form.cfee || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نرخ ارز (exr)
            </label>
            <input
              type="number"
              name="exr"
              value={form.exr || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">تخفیف (dis)</label>
            <input
              type="number"
              name="dis"
              value={form.dis || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/10 text-white/80 bg-purple-700 hover:bg-purple-800 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-pink-300 text-[#23234a] font-bold hover:bg-pink-400 transition-all"
            >
              {isEditing ? "بروزرسانی" : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditInvoiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool,
  form: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    tax_number: PropTypes.string,
    customer_name: PropTypes.string,
    customer_last_name: PropTypes.string,
    customer_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ins: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    indatim: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    indati2m: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    product_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    am: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fee: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cfee: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    exr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dis: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
