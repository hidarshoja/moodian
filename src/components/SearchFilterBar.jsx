import { useState } from "react";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function SearchFilterBar({
  setFilterTable,
  searchTerm,
  onSearchTermChange,
  onRequestInvoiceDetails, // new
  selectedCustomerId, // new
  selectedProductId, // new
  stemId, // new
  statusId,
  startDate,
  endDate,
  filterTable,
  setSearchTerm,
  selectedCustomer,
  selectedProduct,
  stem,
  status
}) {
   const [activeFilters, setActiveFilters] = useState([]);
  const navigate = useNavigate();
  const filterButtons = [
    "مشتری",
    "کالا/خدمات",
    "روش تسویه",
    "وضعیت ارسال",
    "ریز فاکتور",
    "به اکسل",
  ];

  const displayFilterButtons = filterButtons.slice(0, 4);
  const handleFilterClick = (filter) => {
    setSearchTerm("");
    setFilterTable(filter);

    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };


   const handleClearFilter = (filterToRemove) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filterToRemove));
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleSearchInputChange = (e) => {
    onSearchTermChange(e.target.value);
  };

  const handleDetailsRequest = () => {
    if (onRequestInvoiceDetails) onRequestInvoiceDetails();
  };
  function toEnglishDigits(str) {
    if (!str) return "";
    return str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
  }
 
const handleActionClick = async () => {
  let query = "";
  if (selectedCustomerId) {
    query += `&f[customer_id]=${selectedCustomerId}`;
  }
  if (selectedProductId) {
    query += `&f[product_id]=${selectedProductId}`;
  }
  if (stemId) {
    query += `&f[setm]=${stemId}`;
  }
  if (statusId) {
    query += `&f[status]=${statusId}`;
  }
  if(startDate) {
    const start = toEnglishDigits(startDate?.format?.("YYYY/MM/DD") || "");
    query += `&f[indatim][min]=${start}`;
  }
  if(endDate) {
    const end = toEnglishDigits(endDate?.format?.("YYYY/MM/DD") || "");
    query += `&f[indatim][max]=${end}`;
  }
 
  try {
    await axiosClient.get(`/invoices?export=true${query}`);

    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "success",
      title: "فایل با موفقیت بارگذاری شد",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });

    setTimeout(() => {
      navigate("/downloadExcel");
    }, 1000);

  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "error",
      title: "خطا در دریافت داده‌ها",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  }
};

const handleActionClick2 = async () => {
  let query = "";
  if (selectedCustomerId) {
    query += `&f[customer_id]=${selectedCustomerId}`;
  }
  if (selectedProductId) {
    query += `&f[product_id]=${selectedProductId}`;
  }
  if (stemId) {
    query += `&f[setm]=${stemId}`;
  }
  if (statusId) {
    query += `&f[status]=${statusId}`;
  }
  if(startDate) {
    const start = toEnglishDigits(startDate?.format?.("YYYY/MM/DD") || "");
    query += `&f[indatim][min]=${start}`;
  }
  if(endDate) {
    const end = toEnglishDigits(endDate?.format?.("YYYY/MM/DD") || "");
    query += `&f[indatim][max]=${end}`;
  }
   let groupByValue;
  if(filterTable) {
    switch (filterTable) {
      case "کالا/خدمات":
        groupByValue = "product_id";
        break;
      case "روش تسویه":
        groupByValue = "setm";
        break;
      case "وضعیت ارسال":
        groupByValue = "status";
        break;
      default:
        groupByValue = "customer_id";
    }
    query += `&group_by=${groupByValue}`;
  }
  console.log(`query`, query);
  try {
    await axiosClient.get(`/report/invoice/ins-summery?export=true${query}`);

    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "success",
      title: "فایل با موفقیت بارگذاری شد",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });

    setTimeout(() => {
      navigate("/downloadExcel");
    }, 1000);

  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "error",
      title: "خطا در دریافت داده‌ها",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  }
};
     
   

  

  return (
    <div className="w-full mb-4">
      {/* Search Bar */}
      <div className="w-full bg-gradient-to-b from-gray-900 to-gray- border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="جستجو..."
              className="w-full px-4 py-2 border bg-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={handleSearch} className="btn-custom">
            جستجو
          </button>
         {activeFilters.map((filter, index) => {
  // تابع کمکی برای برگردوندن مقدار مناسب هر فیلتر
  let filterValue = "";
  switch (filter) {
    case "مشتری":
      filterValue = selectedCustomer?.title;
      break;
    case "کالا/خدمات":
      filterValue = selectedProduct?.title;
      break;
    case "روش تسویه":
      filterValue = stem?.title;
      break;
    case "وضعیت ارسال":
      filterValue = status?.title;
      break;
    default:
      filterValue = "";
  }

  return (
    <button
      key={index}
      onClick={() => handleClearFilter(filter)}
      className="btn-custom"
    >
      {filter} {filterValue && ` [ ${filterValue} ] `}  X
    </button>
  );
})}

        </div>
      </div>

      <div className="flex flex-wrap gap-2 w-full bg-gradient-to-b from-gray-900 to-gray- border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-3">
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start gap-2">
             {displayFilterButtons.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(filter)}
                className={`px-3 py-1.5 border rounded-lg ${
                  activeFilters.includes(filter)
                    ? "bg-green-600 text-white"
                    : "btn-custom"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end gap-2">
            {/* Action Buttons */}
            <button
              className="btn-custom"
              onClick={handleDetailsRequest}
            
            >
              ریز فاکتور
            </button>
            <button
              className="btn-custom"
              onClick={() => handleActionClick()}
            
            >
             ریز فاکتور اکسل
            </button>
            <button onClick={handleActionClick2} className="btn-custom">
                به اکسل
              
              </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}
