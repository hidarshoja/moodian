import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function EditInvoiceModal({
  isOpen,
  isEditing,
  form,
  onChange,
  onSubmit,
  onClose,
}) {
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateCustomerId = (customerId) => {
    if (!customerId) return "شناسه مشتری الزامی است";
    const idNum = Number(customerId);
    if (isNaN(idNum) || idNum <= 0) {
      return "شناسه مشتری باید عدد مثبت باشد";
    }
    return "";
  };

  const validateTaxNumber = (taxNumber) => {
    if (!taxNumber) return "";
    const taxStr = String(taxNumber);
    const digits = taxStr.replace(/\D/g, "");
    if (digits.length > 0 && digits.length !== 13) {
      return "شماره منحصر به فرد مالیاتی باید ۱۳ رقم باشد";
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

  const validateInp = (inp) => {
    if (!inp) return "نوع پرداخت الزامی است";
    const validInpValues = [1, 2, 3, 4]; // Valid inp values
    const inpNum = Number(inp);
    if (isNaN(inpNum) || !validInpValues.includes(inpNum)) {
      return "نوع پرداخت نامعتبر است";
    }
    return "";
  };

  const validateIns = (ins) => {
    if (!ins) return "شماره سریال الزامی است";
    const insNum = Number(ins);
    if (isNaN(insNum) || insNum <= 0) {
      return "شماره سریال باید عدد مثبت باشد";
    }
    return "";
  };

  const validateItems = (items) => {
    if (!items) return "آیتم‌ها الزامی است";
    try {
      const parsed = JSON.parse(items);
      if (!Array.isArray(parsed)) {
        return "آیتم‌ها باید آرایه باشد";
      }
    } catch (e) {
      return "فرمت آیتم‌ها نامعتبر است";
    }
    return "";
  };

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    const customerIdError = validateCustomerId(form.customer_id);
    if (customerIdError) newErrors.customer_id = customerIdError;

    const taxNumberError = validateTaxNumber(form.tax_number);
    if (taxNumberError) newErrors.tax_number = taxNumberError;

    const intyError = validateInty(form.inty);
    if (intyError) newErrors.inty = intyError;

    const inpError = validateInp(form.inp);
    if (inpError) newErrors.inp = inpError;

    const insError = validateIns(form.ins);
    if (insError) newErrors.ins = insError;

   

    setErrors(newErrors);
  }, [
    form.customer_id,
    form.tax_number,
    form.inty,
    form.inp,
    form.ins,
    form.items,
  ]);

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
            <label className="block mb-1 text-white text-sm">وضعیت</label>
            <select
              name="status"
              value={form.status || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="">انتخاب وضعیت</option>
              <option value="1">تأیید شده</option>
              <option value="2">در انتظار تأیید</option>
              <option value="3">رد شده</option>
              <option value="4">برگشت خورده</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-white text-sm">
              شماره منحصر به فرد مالیاتی
            </label>
            <input
              name="tax_number"
              value={form.tax_number || ""}
              onChange={(e) => {
                // Only allow numeric input and limit to 13 characters
                const value = e.target.value.replace(/\D/g, "").slice(0, 13);
                onChange({
                  target: {
                    name: "tax_number",
                    value: value,
                  },
                });
              }}
              placeholder="13 رقم وارد کنید"
              maxLength={13}
              inputMode="numeric"
              pattern="[0-9]*"
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.tax_number
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            />
            {errors.tax_number && (
              <p className="text-red-400 text-xs mt-1">{errors.tax_number}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-white text-sm">نام مشتری</label>
            <input
              name="customer_name"
              value={form.customer_name || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          <div>
            <label className="block mb-1 text-white text-sm">
              نام خانوادگی مشتری
            </label>
            <input
              name="customer_last_name"
              value={form.customer_last_name || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

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
          </div>  <div>
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
          </div>

          <div>
            <label className="block mb-1 text-white text-sm">شناسه مشتری</label>
            <input
              type="number"
              name="customer_id"
              value={form.customer_id || ""}
              onChange={onChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.customer_id
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            />
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
              <option value="1">فروش کالا</option>
              <option value="2">ارائه خدمات</option>
              <option value="3">فروش کالا و خدمات</option>
              <option value="4">پیش‌فاکتور</option>
              <option value="5">برگشت از فروش</option>
              <option value="6">تخفیف</option>
              <option value="7">اضافه‌کاری</option>
              <option value="8">سایر</option>
              <option value="9">پیش‌پرداخت</option>
            </select>
            {errors.inty && (
              <p className="text-red-400 text-xs mt-1">{errors.inty}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-white text-sm">
              نوع پرداخت (inp)
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
              <option value="">انتخاب نوع پرداخت</option>
              <option value="1">نقدی</option>
              <option value="2">نسیه</option>
              <option value="3">چک</option>
              <option value="4">کارت</option>
            </select>
            {errors.inp && (
              <p className="text-red-400 text-xs mt-1">{errors.inp}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-white text-sm">
              شماره سریال (ins)
            </label>
            <input
              type="number"
              name="ins"
              value={form.ins || ""}
              onChange={onChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.ins
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            />
            {errors.ins && (
              <p className="text-red-400 text-xs mt-1">{errors.ins}</p>
            )}
          </div>

        

          {/* <div className="md:col-span-2">
            <label className="block mb-1 text-white text-sm">
              آیتم‌ها (items)
            </label>
            <textarea
              name="items"
              value={form.items || ""}
              onChange={onChange}
              rows={3}
              placeholder='آیتم‌های فاکتور    '
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 resize-none ${
                errors.items
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:ring-white/20"
              }`}
            />
            {errors.items && (
              <p className="text-red-400 text-xs mt-1">{errors.items}</p>
            )}
          </div> */}

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
    items: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
