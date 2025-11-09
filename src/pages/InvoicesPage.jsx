import { useState, useEffect } from "react";
import SendInvoicesTable from "../components/SendInvoicesTable";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";
import { GrDocumentExcel } from "react-icons/gr";
import ImportExcelModalInvoices from "../components/ImportExcelModalInvoices";
import CreateModalInvoices from "../components/CreateModalInvoices";
import GroupInvoiceStatusCheckModal from "../components/GroupInvoiceStatusCheckModal";
import CheckGroupInvoiceStatusCheckModal from "../components/CheckGroupInvoiceStatusCheckModal";
import { BsFillSendCheckFill } from "react-icons/bs";
import { PiSealCheckBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function InvoicesPage() {
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [activeFilters] = useState({});
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [excelModalOpen2, setExcelModalOpen2] = useState(false);
  const [groupCheckModalOpen, setGroupCheckModalOpen] = useState(false);
  const [checkGroupCheckModalOpen, setCheckGroupCheckModalOpen] = useState(false);
   const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();
  const buildFilterQuery = (filters) => {
    const params = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "type") {
          params.push(`${key}=${value}`);
        } else {
          params.push(`f[${key}]=${encodeURIComponent(value)}`);
        }
      }
    });
    return params.length ? "&" + params.join("&") : "";
  };

  useEffect(() => {
    setLoading(true);
    const query = buildFilterQuery(activeFilters);
    axiosClient
      .get(`/invoices?page=${pageCount}${query}`)
      .then((response) => {
    
        setDataTable(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh, activeFilters, pageCount]);

  const handleExportExcel = () => {
    // exportServicesToExcel(dataTable);
    const query = buildFilterQuery(activeFilters);
    
    const separator = "&";
    axiosClient
      .get(`/invoices?page=${pageCount}${separator}export=1${query}`)
      .then((response) => {
       
        Swal.fire({
          toast: true,
          position: "top-start",
          icon: "success",
          title: "فایل با موفقیت بارگذاری شد",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          customClass: { popup: "swal2-toast" },
          background: "#111827",
          color: "#e5e7eb",
        });
        setTimeout(() => {
          navigate("/downloadExcel");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire({
          toast: true,
          position: "top-start",
          icon: "error",
          title: "خطا در بارگذاری فایل",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      });
};

 useEffect(() => {
    axiosClient
      .get(`/customers`)
      .then((response) => {
        setCustomers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axiosClient
      .get(`/products`)
      .then((response) => {
       
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6 flex  items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">فاکتور فروش</h1>
            <p className="text-white/60 text-sm mt-1">
              نمای کلی فاکتور فروش کاربران
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap lg:flex-nowrap">
            <button
              className="btn-custom"
              onClick={() => setExcelModalOpen2(true)}
            >
              ایجاد +
            </button>

            <button
              className="btn-custom"
              onClick={() => setExcelModalOpen(true)}
            >
              از اکسل
              <span className="inline-block">
                <GrDocumentExcel className="w-5 h-5" />
              </span>
            </button>
            <button
              className="btn-custom"
              onClick={handleExportExcel}
            >
              به اکسل
              <span className="inline-block">
                <GrDocumentExcel className="w-5 h-5" />
              </span>
            </button>
            <button
              className="btn-custom"
               onClick={() => setCheckGroupCheckModalOpen(true)}
            >
              ارسال گروهی
              <span className="inline-block">
                <BsFillSendCheckFill className="w-5 h-5" />
              </span>
            </button>
            <button
              className="btn-custom"
              onClick={() => setGroupCheckModalOpen(true)}
            >
              چک گروهی
              <span className="inline-block">
                <PiSealCheckBold className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <SendInvoicesTable
          records={dataTable}
          loading={loading}
          onRefresh={() => setRefresh(!refresh)}
          onClose2={() => setExcelModalOpen2(false)}
          customers = {customers}
          products = {products}
        />
      </div>

      <ImportExcelModalInvoices
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
      <CreateModalInvoices
        isOpen2={excelModalOpen2}
        onClose2={() => setExcelModalOpen2(false)}
        refresh = {refresh}
        setRefresh={setRefresh}
        customers={customers}
      />
      <GroupInvoiceStatusCheckModal
        isOpen={groupCheckModalOpen}
        onClose={() => setGroupCheckModalOpen(false)}
      />
      <CheckGroupInvoiceStatusCheckModal
        isOpen={checkGroupCheckModalOpen}
        onClose={() => setCheckGroupCheckModalOpen(false)}
      />
      <Pagination
        meta={meta}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
      />
    </div>
  );
}
