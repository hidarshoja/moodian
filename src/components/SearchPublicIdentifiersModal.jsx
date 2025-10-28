import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";
import axiosClient from "../axios-client";
import Pagination2 from "./Pagination2";

export default function SearchPublicIdentifiersModal({
  isOpen,
  onClose,
  onSelectItem,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(""); // service, production, import
  const [dataTable, setDataTable] = useState([]);
  const [searchTermClick, setSearchTermClick] = useState(false);
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    let query = `/sstids?page=${pageCount} `;

    if (searchTerm && !activeTab) {
      query = `/sstids?page=${pageCount}&&f[sstid]=${searchTerm}`;
    } else if (!searchTerm && activeTab) {
      query = `/sstids?page=${pageCount}&&f[type]=${activeTab}`;
    } else if (searchTerm && activeTab) {
      query = `/sstids?page=${pageCount}&&f[sstid]=${searchTerm}&&f[type]=${activeTab}`;
    }

    axiosClient
      .get(query)
      .then((response) => {
        setMeta(response.data.meta);
        setDataTable(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setSearchTermClick(false);
  }, [searchTermClick, activeTab, pageCount, searchTerm]);

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setPageCount(1);
  };

  const handleSelectItem = (item) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
    onClose();
  };

  const tabs = [
    { key: "شناسه عمومی خدمت", label: "عمومی خدمت" },
    { key: "شناسه عمومی تولید", label: "عمومی تولید" },
    { key: "شناسه عمومی وارداتی", label: "عمومی وارداتی" },
  ];
  const handleTabDelete = () => {
    setActiveTab("");
    setSearchTerm("");
  };
console.log(`dataTable`, dataTable);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-[90%] h-[90%] max-w-6xl bg-[#23234a] rounded-2xl shadow-2xl relative flex flex-col animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-lg font-bold">
            جستجو در شناسه های عمومی بر اساس نام کالا و یا شناسه
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl"
          >
            <GrClose />
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="جستجو ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                dir="rtl"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={() => {
                setSearchTermClick(true);
              }}
              className="bg-[#1A2035] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a3155] transition-colors"
            >
              <CiSearch className="w-5 h-5" />
              جستجو
            </button>

            {/* Tab Buttons */}
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#4A90E2] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleTabDelete}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors "bg-white text-gray-100 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                پاک کردن فیلترها
              </button>
            </div>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-5 gap-4 bg-gray-100 p-3 rounded-lg">
            <div className="text-center font-medium text-gray-700">شناسه</div>
            <div className="text-center font-medium text-gray-700">نام</div>
            <div className="text-center font-medium text-gray-700">نوع</div>
            <div className="text-center font-medium text-gray-700">
              نرخ ارزش افزوده
            </div>
           
            <div className="text-center font-medium text-gray-700">
              نرخ سایر مالیات و عوارض 
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {dataTable.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">رکوردی وجود ندارد</p>
            </div>
          ) : (
            <div className="space-y-2">
              {dataTable.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 p-3 border text-white border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
                  onClick={() => handleSelectItem(item)}
                >
                  <div className="text-center">{item?.sstid}</div>
                  <div className="text-center">{item?.description}</div>
                  <div className="text-center">{item?.type}</div>
                  <div className="text-center">{item?.vat}</div>
                  <div className="text-center">{item?.vat_custom_purposes}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200">
          {/* Pagination Bar */}
          {/* <div className="bg-[#1A2035] text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                className="p-1 hover:bg-white/20 rounded"
                disabled={currentPage === 1}
              >
                <MdKeyboardDoubleArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1 hover:bg-white/20 rounded"
                disabled={currentPage === 1}
              >
                <MdKeyboardArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-1 hover:bg-white/20 rounded"
                disabled={totalItems === 0}
              >
                <MdKeyboardArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.ceil(totalItems / 10))}
                className="p-1 hover:bg-white/20 rounded"
                disabled={totalItems === 0}
              >
                <MdKeyboardDoubleArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm">
              of {totalItems} items{" "}
              {totalItems === 0
                ? "0-0"
                : `${(currentPage - 1) * 10 + 1}-${Math.min(
                    currentPage * 10,
                    totalItems
                  )}`}
            </div>
          </div> */}
          <Pagination2
            currentPage={pageCount}
            setCurrentPage={setPageCount}
            totalItems={meta.total || 0}
            itemsPerPage={meta.per_page || 10}
          />

          {/* Cancel Button */}
          <div className="py-4 flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#8A4DAB] w-full text-white px-8 py-3  font-medium hover:bg-[#7a4299] transition-colors"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchPublicIdentifiersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func,
};
