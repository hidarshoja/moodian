import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import PropTypes from "prop-types";

export default function ReportsFilter({
  startDate,
  endDate,
  fromMonth,
  toMonth,
  onStartDateChange,
  onEndDateChange,
  onFromMonthChange,
  onToMonthChange,
  onClearAll,
  status,
  setStatus,
  onSendAll,
  setStartDate,
  setEndDate,
  setFromMonth,
  setToMonth,
}) {
  const [activeTab, setActiveTab] = useState("day");
  // گروه‌های موردنظر مطابق تصویر
  const statusGroups = [
    { label: "ارسال موفق", values: ["100"] },
    { label: "ارسال شده", values: ["20"] },
    { label: "ارسال نشده", values: ["0", "10", "-10"] },
    { label: "درانتظار", values: ["10"] },
    { label: "خطا", values: ["-80", "-90"] },
  ];
  const ensureArray = (arr) => (Array.isArray(arr) ? arr : []);
  const isGroupChecked = (groupValues) => {
    const current = ensureArray(status);
    return groupValues.every((v) => current.includes(v));
  };
  const handleGroupToggle = (groupValues) => {
    const current = ensureArray(status);
    const allSelected = groupValues.every((v) => current.includes(v));
    if (allSelected) {
      setStatus(current.filter((v) => !groupValues.includes(v)));
    } else {
      const merged = Array.from(new Set([...current, ...groupValues]));
      setStatus(merged);
    }
  };
  return (
    <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all p-2 mt-2 flex flex-col lg:flex-row gap-1 ">
      <div className="border  rounded-md border-white w-full  p-1 flex flex-col gap-1">
        <div className="flex gap-2 my-2 items-center justify-center">
          <button
            className={`btn-custom3 ${
              activeTab === "day" ? "btn-custom3Active" : ""
            }`}
            onClick={() => {
              setActiveTab("day");
              setToMonth(null);
              setFromMonth(null);
            }}
          >
            فیلتر براساس روز
          </button>
          <button
            className={`btn-custom3 ${
              activeTab === "month" ? "btn-custom3Active" : ""
            }`}
            onClick={() => {
              setActiveTab("month");
              setStartDate(null);
              setEndDate(null);
            }}
          >
            فیلتر براساس ماه
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          {/* فیلتر براساس روز */}
          {activeTab === "day" && (
            <div className="flex gap-2 w-full md:w-1/2">
              <div className="input_date w-full md:w-1/2">
                <span className="block text-gray-100 text-[10px] mb-2">
                  تاریخ شروع{" "}
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
              <div className="input_date w-full md:w-1/2">
                <span className="block text-gray-100 text-[10px] mb-2">
                  تاریخ پایان{" "}
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
          )}
          {activeTab === "month" && (
            <div className="flex gap-2 w-full md:w-1/2">
              <div className="input_date w-full md:w-w-1/2">
                <span className="block text-gray-100 text-[10px] mb-2">
                  از ماه
                </span>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={fromMonth}
                  onChange={onFromMonthChange}
                  calendarPosition="bottom-right"
                  inputClass="custom-input"
                  onlyMonthPicker={true}
                />
              </div>
              <div className="input_date w-full md:w-w-1/2">
                <span className="block text-gray-100 text-[10px] mb-2">
                  تا ماه
                </span>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={toMonth}
                  onChange={onToMonthChange}
                  calendarPosition="bottom-right"
                  inputClass="custom-input"
                  onlyMonthPicker={true}
                />
              </div>
            </div>
          )}
          <div className="flex gap-2 w-full md:w-1/2">
            <div className="flex flex-col gap-2 w-1/2">
              <span className="text-[10px] text-gray-100">
                وضعیت (چند انتخابی)
              </span>
              <div className="flex flex-wrap gap-3">
                {statusGroups.map((grp) => {
                  const checked = isGroupChecked(grp.values);
                  return (
                    <label
                      key={grp.label}
                      className="flex items-center gap-2 text-[10px] text-gray-100"
                    >
                      <input
                        type="checkbox"
                        className="accent-blue-500 appearance-none w-10 h-5 bg-gray-300 rounded-full relative outline-none cursor-pointer transition-colors checked:bg-indigo-900"
                        checked={!!checked}
                        onChange={() => handleGroupToggle(grp.values)}
                        style={{
                          backgroundColor: checked ? "#1e1b4b" : undefined,
                        }}
                      />
                      <span>{grp.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2 w-1/4 justify-end">
              <button onClick={onClearAll} className="btn-custom">
                پاک کردن فیلترها
              </button>
            </div>
            <div className="flex items-center gap-2 w-1/4 justify-end">
              <button onClick={onSendAll} className="btn-custom">
                اعمال فیلترها
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReportsFilter.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  fromMonth: PropTypes.any,
  toMonth: PropTypes.any,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  onFromMonthChange: PropTypes.func.isRequired,
  onToMonthChange: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.string).isRequired,
  setStatus: PropTypes.func.isRequired,
  onSendAll: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setFromMonth: PropTypes.func.isRequired,
  setToMonth: PropTypes.func.isRequired,
};
