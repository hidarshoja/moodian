import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";

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
  setToMonth
}) {
  const [activeTab, setActiveTab] = useState("day");
  const statusOptions = [
    { label: "یافت نشد", value: -90 },
    { label: "ناموفق توسط مالیات", value: -80 },
    { label: "ناموفق ارسال به مالیات", value: -10 },
    { label: "جدید", value: 0 },
    { label: "در انتظار ارسال به مالیات", value: 10 },
    { label: "در انتظار مالیات", value: 20 },
    { label: "تایید شده", value: 100 },
  ];
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
            <div className="flex flex-col  gap-2 w-1/3">
              <span className="text-[10px]  text-gray-100">وضعیت</span>
              <select
                className="border rounded px-2 py-[2px] text-[10px] bg-gray-400"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">همه وضعیت‌ها</option>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 w-1/3 justify-end">
              <button onClick={onClearAll} className="btn-custom">
                پاک کردن فیلترها
              </button>
            </div>
            <div className="flex items-center gap-2 w-1/3 justify-end">
              <button onClick={onSendAll} className="btn-custom">اعمال فیلترها</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
