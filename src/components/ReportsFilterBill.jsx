import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import PropTypes from "prop-types";

export default function ReportsFilterBill({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearAll,
  status,
  setStatus,
  onSendAll,
  transactionType,
  onTransactionTypeChange,
  trackingCode,
  onTrackingCodeChange,
}) {
  const statusOptions = [
    { label: "ناموفق", value: "-100" },
    { label: "در انتظار", value: "30" },
    { label: "موفق", value: "100" },
  ];
  const handleStatusToggle = (value) => {
    const current = Array.isArray(status) ? status : [];
    if (current.includes(value)) {
      setStatus(current.filter((v) => v !== value));
    } else {
      setStatus([...current, value]);
    }
  };
  return (
    <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all p-3 sm:p-4 mt-2">
      <div className="border rounded-lg border-white/20 w-full p-3 sm:p-4 flex flex-col gap-4">
        {/* ردیف اول: تاریخ‌ها و نوع تراکنش */}
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          {/* تاریخ شروع و پایان */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/2">
            <div className="input_date w-full sm:w-1/2">
              <span className="block text-gray-100 text-xs sm:text-sm mb-2 font-medium">
                تاریخ شروع
              </span>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={startDate}
                onChange={onStartDateChange}
                calendarPosition="bottom-right"
                inputClass="custom-input"
              />
            </div>
            <div className="input_date w-full sm:w-1/2">
              <span className="block text-gray-100 text-xs sm:text-sm mb-2 font-medium">
                تاریخ پایان
              </span>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={endDate}
                onChange={onEndDateChange}
                calendarPosition="bottom-right"
                inputClass="custom-input"
              />
            </div>
          </div>
          {/* نوع تراکنش و کد رهگیری */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/2">
            <div className="w-full sm:w-1/2">
              <span className="block text-gray-100 text-xs sm:text-sm mb-2 font-medium">
                نوع تراکنش
              </span>
              <select
                value={transactionType}
                onChange={(e) => onTransactionTypeChange(e.target.value)}
                className="custom-input"
              >
                <option value="all">همه</option>
                <option value="deposit">واریز</option>
                <option value="withdrawal">برداشت</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <span className="block text-gray-100 text-xs sm:text-sm mb-2 font-medium">
                کد رهگیری
              </span>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => onTrackingCodeChange(e.target.value)}
                placeholder="کد رهگیری را وارد کنید"
                className="custom-input"
              />
            </div>
          </div>
        </div>

        {/* ردیف دوم: وضعیت */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-3">
            <span className="text-xs sm:text-sm text-gray-100 font-medium">
              وضعیت (چند انتخابی)
            </span>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {statusOptions.map((opt) => {
                const checked =
                  Array.isArray(status) && status.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-100 cursor-pointer hover:text-white transition-colors"
                  >
                    <span className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={!!checked}
                        onChange={() => handleStatusToggle(opt.value)}
                      />
                      <span
                        className="relative w-12 h-6 rounded-full bg-gray-300 transition-colors peer-checked:bg-indigo-900 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-6"
                        dir="rtl"
                      />
                    </span>
                    <span className="whitespace-nowrap">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClearAll}
            className="btn-custom w-full sm:w-auto px-6 py-2.5 text-sm font-medium"
          >
            پاک کردن فیلترها
          </button>
          <button
            onClick={onSendAll}
            className="btn-custom w-full sm:w-auto px-6 py-2.5 text-sm font-medium"
          >
            اعمال فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}

ReportsFilterBill.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  fromMonth: PropTypes.any,
  toMonth: PropTypes.any,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  onFromMonthChange: PropTypes.func,
  onToMonthChange: PropTypes.func,
  onClearAll: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.string).isRequired,
  setStatus: PropTypes.func.isRequired,
  onSendAll: PropTypes.func.isRequired,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  setFromMonth: PropTypes.func,
  setToMonth: PropTypes.func,
  transactionType: PropTypes.string.isRequired,
  onTransactionTypeChange: PropTypes.func.isRequired,
  trackingCode: PropTypes.string.isRequired,
  onTrackingCodeChange: PropTypes.func.isRequired,
};
