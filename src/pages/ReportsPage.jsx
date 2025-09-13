import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [toYear, setToYear] = useState(null);
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);
  const [season, setSeason] = useState("");

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const handleFromYearChange = (selectedDate) => {
    setFromYear(selectedDate);
  };

  const handleToYearChange = (selectedDate) => {
    setToYear(selectedDate);
  };

  const handleFromMonthChange = (selectedDate) => {
    setFromMonth(selectedDate);
  };

  const handleToMonthChange = (selectedDate) => {
    setToMonth(selectedDate);
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">گزارش</h1>
          <p className="text-white/60 text-sm mt-1">نمای کلی گزارش کاربران</p>
        </div>
      </div>
      <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all  p-2 mt-2 flex flex-col lg:flex-row gap-1">
        <div className="border rounded-md border-white w-full lg:w-1/2 p-1 flex gap-1">
          <div className="input_date w-full md:w-1/6">
            <span className="block text-gray-100 text-sm mb-2">
              تاریخ شروع{" "}
            </span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={startDate}
              onChange={handleStartDateChange}
              calendarPosition="bottom-right"
              inputClass="custom-input"
            />
          </div>
          <div className="input_date w-full md:w-1/6">
            <span className="block text-gray-100 text-sm mb-2">
              تاریخ پایان{" "}
            </span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={endDate}
              onChange={handleEndDateChange}
              calendarPosition="bottom-right"
              inputClass="custom-input"
            />
          </div>
          <div className="input_date w-full md:w-1/6">
            <span className="block text-gray-100 text-sm mb-2"> سال</span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={fromYear}
              onChange={handleFromYearChange}
              calendarPosition="bottom-right"
              inputClass="custom-input"
              onlyYearPicker={true}
            />
          </div>
          <div className="input_date w-full md:w-1/6">
            <span className="block text-gray-100 text-sm mb-2">از ماه</span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={fromMonth}
              onChange={handleFromMonthChange}
              calendarPosition="bottom-right"
              inputClass="custom-input"
              onlyMonthPicker={true}
            />
          </div>
          <div className="input_date w-full md:w-1/6">
            <span className="block text-gray-100 text-sm mb-2">تا ماه</span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={toMonth}
              onChange={handleToMonthChange}
              calendarPosition="bottom-right"
              inputClass="custom-input"
              onlyMonthPicker={true}
            />
          </div>
          <div className="input_date w-full md:w-1/6">
            <span className="block text-gray-100 text-sm mb-1">فصل</span>
            <select
              value={season}
              onChange={handleSeasonChange}
              className="w-full  text-sm bg-white/10 border border-white rounded-md text-white placeholder-gray-400 focus:outline-none"
            >
              <option value="" className="bg-gray-800 text-white">
                انتخاب فصل
              </option>
              <option value="spring" className="bg-gray-800 text-white">
                بهار
              </option>
              <option value="summer" className="bg-gray-800 text-white">
                تابستان
              </option>
              <option value="autumn" className="bg-gray-800 text-white">
                پاییز
              </option>
              <option value="winter" className="bg-gray-800 text-white">
                زمستان
              </option>
            </select>
          </div>
        </div>
        <div className="border rounded-md border-white w-full lg:w-1/2 p-1 flex gap-1">
        </div>
      </div>
    </div>
  );
}
