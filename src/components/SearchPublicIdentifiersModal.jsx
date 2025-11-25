import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";
import axiosClient from "../axios-client";
import Pagination2 from "./Pagination2";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function SearchPublicIdentifiersModal({
  isOpen,
  onClose,
  onSelectItem,
}) {
  // حذف searchTermClick و nameSearch و ترکیب کردن در یک state واحد برای جستجو
  const [searchParams, setSearchParams] = useState({
    term: "",
    type: "name", // "id" یا "name"
    tab: "", // نام بندی تب
    page: 1,
  });
  const [dataTable, setDataTable] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  // آپدیت برای فرم ورودی (صرفاً مقدار term را عوض کند، جستجو نکند)
  const updateSearchField = (term) => {
    setSearchParams((prev) => ({ ...prev, term }));
  };

  // تغییر صفحه
  const handlePageChange = (page) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  // تغییر تب
  const handleTabChange = (tab) => {
    setSearchParams((prev) => ({ ...prev, tab, page: 1 }));
  };

  // جستجو فقط با دکمه (type و term و page=1 با هم تنظیم شود)
  const handleSearchBy = (type) => {
    setSearchParams((prev) => ({
      ...prev,
      type,
      page: 1,
      trigger: Math.random(),
    }));
  };

  // پاک کردن فیلتر
  const handleClearFilters = () => {
    setSearchParams({
      term: "",
      type: "name",
      tab: "",
      page: 1,
      trigger: Math.random(),
    });
  };

  // useEffect فقط روی trigger، type، tab، page
  useEffect(() => {
    let query = `/sstids?page=${searchParams.page}`;
    if (searchParams.type === "id") {
      if (searchParams.term && !searchParams.tab) {
        query = `/sstids?page=${searchParams.page}&&f[sstid]=${searchParams.term}`;
      } else if (!searchParams.term && searchParams.tab) {
        query = `/sstids?page=${searchParams.page}&&f[type]=${searchParams.tab}`;
      } else if (searchParams.term && searchParams.tab) {
        query = `/sstids?page=${searchParams.page}&&f[sstid]=${searchParams.term}&&f[type]=${searchParams.tab}`;
      }
    } else {
      if (searchParams.term && !searchParams.tab) {
        query = `/sstids?page=${searchParams.page}&&f[description]=${searchParams.term}`;
      } else if (!searchParams.term && searchParams.tab) {
        query = `/sstids?page=${searchParams.page}&&f[type]=${searchParams.tab}`;
      } else if (searchParams.term && searchParams.tab) {
        query = `/sstids?page=${searchParams.page}&&f[description]=${searchParams.term}&&f[type]=${searchParams.tab}`;
      }
    }
    setLoading(true);
    axiosClient
      .get(query)
      .then((response) => {
        setMeta(response.data.meta);
        setDataTable(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [
    searchParams.trigger,
    searchParams.type,
    searchParams.tab,
    searchParams.page,
  ]);

  if (!isOpen) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-[90%] h-[90%] max-w-6xl bg-[#23234a] rounded-2xl shadow-2xl relative flex flex-col animate-slideIn max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <h2 className="text-sm lg:text-lg font-bold">
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
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center flex-col gap-4 mb-4">
            {/* Search Input */}
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-2/4">
                <input
                  type="text"
                  placeholder="جستجو ..."
                  value={searchParams.term}
                  onChange={(e) => updateSearchField(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  dir="rtl"
                />
              </div>
            <div className="w-full md:w-2/4 flex flex-row gap-2">
                {/* Search by ID */}
                <button
                onClick={() => handleSearchBy("id")}
                className={`bg-[#1A2035] w-1/2  text-white px-1 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#2a3155] transition-colors text-sm ${
                  searchParams.type === "id" ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <CiSearch className="w-5 h-5" />
                <span>جسجو براساس شناسه</span>
              </button>
              {/* Search by Name */}
              <button
                onClick={() => handleSearchBy("name")}
                className={`bg-[#1A2035] w-1/2  text-white px-1 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#2a3155] transition-colors text-sm ${
                  searchParams.type === "name" ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <CiSearch className="w-5 h-5" />
                <span>جسجو براساس نام</span>
              </button>
            </div>
            </div>
            {/* Tab Buttons */}
            <div className="flex flex-row gap-2 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`w-1/4 md:w-full lg:w-auto px-1 text-xs md:text-sm md:px-4 py-1 md:py-2 rounded-lg  font-medium transition-colors ${
                    searchParams.tab === tab.key
                      ? "bg-[#4A90E2] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleClearFilters}
                className="w-1/4 md:w-full lg:w-auto px-1 md:px-4 py-1 md:py-2  rounded-lg  text-xs md:text-sm font-medium transition-colors bg-red-500 text-gray-100 border border-gray-300 hover:bg-red-600"
              >
                پاک کردن فیلترها
              </button>
            </div>
          </div>

          {/* Table Headers - Desktop Only */}
          <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-100 p-3 rounded-lg">
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
        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          {loading ? (
            <Spinner />
          ) : dataTable.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">رکوردی وجود ندارد</p>
            </div>
          ) : (
            <>
              {/* Desktop Grid View */}
              <div className="hidden md:block space-y-2">
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
                    <div className="text-center">
                      {item?.vat_custom_purposes}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {dataTable.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 text-white cursor-pointer transition-colors ${
                      index % 2 === 0
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-white/20 pb-2">
                        <span className="text-xs text-white/70">شناسه:</span>
                        <span className="text-sm font-medium text-white/90">
                          {item?.sstid}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/20 pb-2">
                        <span className="text-xs text-white/70">نام:</span>
                        <span className="text-sm font-medium text-white/90">
                          {item?.description}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/20 pb-2">
                        <span className="text-xs text-white/70">نوع:</span>
                        <span className="text-sm font-medium text-white/90">
                          {item?.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/20 pb-2">
                        <span className="text-xs text-white/70">
                          نرخ ارزش افزوده:
                        </span>
                        <span className="text-sm font-medium text-white/90">
                          {item?.vat}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-xs text-white/70">
                          نرخ سایر مالیات و عوارض:
                        </span>
                        <span className="text-sm font-medium text-white/90">
                          {item?.vat_custom_purposes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 flex-shrink-0">
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
            currentPage={searchParams.page}
            setCurrentPage={handlePageChange}
            totalItems={meta.total || 0}
            itemsPerPage={meta.per_page || 10}
          />

          {/* Cancel Button */}
          <div className="py-4 flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#8A4DAB] w-full text-white px-8 py-3 font-medium hover:bg-[#7a4299] transition-colors"
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
