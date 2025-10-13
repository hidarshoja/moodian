import { useState, useEffect } from "react";
import SendInvoicesTable from "../components/SendInvoicesTable";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";
import { GrDocumentExcel } from "react-icons/gr";
import ImportExcelModalInvoices from "../components/ImportExcelModalInvoices";
import CreateModalInvoices from "../components/CreateModalInvoices";
import GroupInvoiceStatusCheckModal from "../components/GroupInvoiceStatusCheckModal";
import { BsFillSendCheckFill } from "react-icons/bs";
import { PiSealCheckBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

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
    console.log(`query`, query);
    const separator = "&";
    axiosClient
      .get(`/invoices?page=${pageCount}${separator}export=1${query}`)
      .then((response) => {
        console.log(response.data.data);
        setTimeout(() => {
          navigate("/downloadExcel");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
};


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
          <div className="flex items-center justify-center gap-3">
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
              // onClick={() => setExcelModalOpen(true)}
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
        />
      </div>

      <ImportExcelModalInvoices
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
      <CreateModalInvoices
        isOpen2={excelModalOpen2}
        onClose2={() => setExcelModalOpen2(false)}
      />
      <GroupInvoiceStatusCheckModal
        isOpen={groupCheckModalOpen}
        onClose={() => setGroupCheckModalOpen(false)}
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
