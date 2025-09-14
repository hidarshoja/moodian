import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { GrDocumentExcel } from "react-icons/gr";
import { FaBalanceScaleRight } from "react-icons/fa";
import { useState } from "react";

export default function ContradictionFilter({
  fromYear,
  season,
  onFromYearChange,
  onSeasonChange,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };
  return (
    <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all p-2 mt-2 flex flex-col gap-3">
      <div className="border rounded-md border-white w-full  p-4 flex flex-wrap gap-9 items-center justify-between">
        <div>
          <h1 className="text-white text-base">مغایرت گیری کارپوشه با تجربه</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
          {selectedFile && (
              <div className="flex items-center gap-2 bg-white/10 rounded-md px-3 py-2">
                <span className="text-white text-sm">{selectedFile.name}</span>
                <button
                  onClick={handleRemoveFile}
                  className="text-white hover:text-red-400 transition-colors"
                  title="حذف فایل"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
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
          <div className="input_date">
            <select
              value={season}
              onChange={onSeasonChange}
              className="w-full py-[5px] text-sm bg-white/10 border border-white rounded-md text-white placeholder-gray-400 focus:outline-none"
            >
              <option value="spring" className="bg-gray-800 text-white">
                الگوی اول (فروش)
              </option>
              <option value="summer" className="bg-gray-800 text-white">
                الگوی دوم (صرافی)
              </option>
              <option value="autumn" className="bg-gray-800 text-white">
                الگوی سوم (طلا، جواهر و پلاتین)
              </option>
              <option value="winter" className="bg-gray-800 text-white">
                الگوی چهارم (قرارداد پیمانکاری)
              </option>
              <option value="winter" className="bg-gray-800 text-white">
                الگوی ششم (بلیط هواپیما)
              </option>
              <option value="winter" className="bg-gray-800 text-white">
                الگوی هفتم (صادرات)
              </option>
              <option value="winter" className="bg-gray-800 text-white">
                الگوی هشتم (بارنامه)
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="border rounded-md border-white w-full  p-1 flex items-center justify-between gap-1">
          <div className="w-1/2 flex items-center gap-2">
          <div className="input_date w-1/3">
          <span className="block text-gray-100 text-[10px] mb-2"> سال</span>
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
        <div className="input_date w-1/3">
          <span className="block text-gray-100 text-[10px] mb-1">فصل</span>
          <select
            value={season}
            onChange={onSeasonChange}
            className="w-full text-sm bg-white/10 border border-white rounded-md text-white placeholder-gray-400 focus:outline-none"
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
        <div className="w-1/3"></div>
          </div>
          <div className="w-1/2 flex items-center justify-end gap-2">
          <div className="w-1/3"></div>
          <div className="input_date">
          <button
             // onClick={handleExportExcel}
              className="btn-custom">
                به اکسل
                <span className="inline-block">
                  <GrDocumentExcel className="w-5 h-5" />
                </span>
              </button>
        </div>
        <div className="input_date">
        <button
             // onClick={handleExportExcel}
              className="btn-custom">
                 مغایرت
                <span className="inline-block">
                  <FaBalanceScaleRight className="w-5 h-5" />
                </span>
              </button>
         
        </div>
        
          </div>
      </div>
    </div>
  );
}
