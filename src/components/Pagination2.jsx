import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination2 = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage = 10,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageRange = () => {
    if (totalItems === 0) return "0-0";
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return `${start}-${end}`;
  };

  return (
    <div className="bg-[#1A2035] text-white px-6 py-1 md:py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
      <div className="relative group">
  <button
    onClick={() => handlePageChange(totalPages)}
    className="p-1 hover:bg-white/20 rounded"
    disabled={currentPage >= totalPages || totalItems === 0}
  >
    <MdKeyboardDoubleArrowRight className="w-5 h-5" />
  </button>

  {/* Tooltip */}
  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
                   px-2 py-1 bg-gray-800 text-white text-xs rounded
                   opacity-0 group-hover:opacity-100 transition-opacity">
    صفحه آخر
  </span>
      </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="p-1 hover:bg-white/20 rounded"
          disabled={currentPage >= totalPages || totalItems === 0}
        >
          <MdKeyboardArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className="p-1 hover:bg-white/20 rounded"
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft className="w-5 h-5" />
        </button>
       
        
        <div className="relative group">
  <button
     onClick={() => handlePageChange(1)}
     className="p-1 hover:bg-white/20 rounded"
     disabled={currentPage === 1}
  >
    <MdKeyboardDoubleArrowLeft className="w-5 h-5" />
  </button>

  {/* Tooltip */}
  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
                   px-2 py-1 bg-gray-800 text-white text-xs rounded
                   opacity-0 group-hover:opacity-100 transition-opacity">
    صفحه اول
  </span>
      </div>
      </div>
      <div className="text-sm">
        of {totalItems} items {getPageRange()}
      </div>
    </div>
  );
};

export default Pagination2;
