import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function ReportsFilter({
  startDate,
  endDate,
  fromYear,
  toYear,
  fromMonth,
  toMonth,
  season,
  errorStatus,
  pendingStatus,
  notSentStatus,
  sentStatus,
  successfulStatus,
  onStartDateChange,
  onEndDateChange,
  onFromYearChange,
  onToYearChange,
  onFromMonthChange,
  onToMonthChange,
  onSeasonChange,
  onErrorToggle,
  onPendingToggle,
  onNotSentToggle,
  onSentToggle,
  onSuccessfulToggle,
  onClearAll,
}) {
  return (
    <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all p-2 mt-2 flex flex-col lg:flex-row gap-1 ">
      <div className="border rounded-md border-white w-full lg:w-1/2 p-1 flex gap-1">
      {/* فیلتر براساس روز */}
        <div className="input_date w-full md:w-1/7">
          <span className="block text-gray-100 text-[10px] mb-2">تاریخ شروع </span>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={startDate}
            onChange={onStartDateChange}
            calendarPosition="bottom-right"
            inputClass="custom-input"
          />
        </div>
        <div className="input_date w-full md:w-1/7">
          <span className="block text-gray-100 text-[10px] mb-2">تاریخ پایان </span>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={endDate}
            onChange={onEndDateChange}
            calendarPosition="bottom-right"
            inputClass="custom-input"
          />
        </div>
      
        {/* فیلتر براساس ماه */}
        <div className="input_date w-full md:w-1/7">
          <span className="block text-gray-100 text-[10px] mb-2">از ماه</span>
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
        <div className="input_date w-full md:w-1/7">
          <span className="block text-gray-100 text-[10px] mb-2">تا ماه</span>
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
      <div className="border rounded-md border-white w-full lg:w-1/2 p-4 flex flex-wrap gap-9 items-center justify-start">
        {/* خطا */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-100">خطا</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={errorStatus}
              onChange={onErrorToggle}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* در انتظار */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-100">در انتظار</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={pendingStatus}
              onChange={onPendingToggle}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* ارسال نشده */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-100">ارسال نشده</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notSentStatus}
              onChange={onNotSentToggle}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* ارسال شده */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-100">ارسال شده</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={sentStatus}
              onChange={onSentToggle}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* ارسال موفق */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-100">ارسال موفق</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={successfulStatus}
              onChange={onSuccessfulToggle}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {/* پاک کردن */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="btn-custom"
          >
            پاک کردن فیلترها
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
           
            className="btn-custom"
          >
             اعمال فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}
