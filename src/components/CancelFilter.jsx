import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { GrDocumentExcel } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useState } from "react";

export default function CancelFilter({
  startDate,
  endDate,
  fromYear,
  toYear,
  onStartDateChange,
  onEndDateChange,
  onFromYearChange,
  onToYearChange,
  searchTerm,
  onSearchTermChange,
  onClearAll,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all p-2 mt-2 flex flex-col gap-3">
      {/* Search Section */}
      <div className="border rounded-md border-white w-full p-4 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h1 className="text-white text-base">جستجو و فیلتر ابطال</h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder="جستجو بر اساس نام، کد فاکتور..."
              className="px-3 py-2 text-sm bg-white/10 border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
            />
            <button onClick={handleSearch} className="btn-custom">
              <HiOutlineSearch className="w-4 h-4" />
              جستجو
            </button>
          </div>
        </div>
      </div>

      {/* Date and File Upload Section */}
      <div className="border rounded-md border-white w-full p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {selectedFile && (
              <div className="flex items-center gap-2 bg-white/10 rounded-md px-3 py-2">
                <span className="text-white text-sm">{selectedFile.name}</span>
                <button
                  onClick={handleRemoveFile}
                  className="text-white hover:text-red-400 transition-colors"
                  title="حذف فایل"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="relative">
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx,.xls,.csv"
              />
              <label
                htmlFor="fileInput"
                className="btn-custom cursor-pointer inline-block"
              >
                انتخاب فایل
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
        
          <button onClick={onClearAll} className="btn-custom">
            پاک کردن همه
            <span className="inline-block">
              <FaTimes className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Date Range Section */}
      <div className="border rounded-md border-white w-full p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="input_date">
            <span className="block text-gray-100 text-[10px] mb-2">
              از تاریخ
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
          <div className="input_date">
            <span className="block text-gray-100 text-[10px] mb-2">
              تا تاریخ
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

        <div className="flex items-center gap-4">
          <div className="input_date">
            <span className="block text-gray-100 text-[10px] mb-2">از سال</span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={fromYear}
              onChange={onFromYearChange}
              calendarPosition="bottom-right"
              inputClass="custom-input"
              onlyYearPicker={true}
            />
          </div>
          <div className="input_date">
            <span className="block text-gray-100 text-[10px] mb-2">تا سال</span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={toYear}
              onChange={onToYearChange}
              calendarPosition="bottom-right"
              inputClass="custom-input"
              onlyYearPicker={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
