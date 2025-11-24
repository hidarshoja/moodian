import ServicesTable from "../components/ServicesTable";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";
import AddServiceModal from "../components/AddServiceModal";
import ImportExcelModal from "../components/ImportExcelModal";
import { exportServicesToExcel } from "../components/exportServicesToExcel";
import { useState , useEffect } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [refresh , setRefresh] = useState(false);
  const [units, setUnits] = useState([]);
 const navigate = useNavigate();
  const initialFilters = {
    title: "",
    last_name: "",
    sstid: "",
    tel: "",
    unit_id: "",
  };
  const [filterInputs, setFilterInputs] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState({});
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
      .get(`/products?page=${pageCount}${query}`)
      .then((response) => {
        setDataTable(response.data.data);
           setMeta(response.data.meta);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh, activeFilters , pageCount]);

  useEffect(() => {
   
    axiosClient
      .get(`/units`)
      .then((response) => {
        setUnits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      
  }, []);


  const handleExportExcel = () => {
      // exportServicesToExcel(dataTable);
      const query = buildFilterQuery(activeFilters);
      const separator = query ? "&" : "&";
      axiosClient
        .get(`/products?page=${pageCount}${query}${separator}export=1`)
        .then((response) => {
        
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AddServiceModal isOpen={modalOpen} refresh={refresh} setRefresh={setRefresh} onClose={() => setModalOpen(false)} units={units} />
      <ImportExcelModal
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-lg lg:text-2xl font-bold">کالا و خدمات</h1>
          <div className="flex  items-center justify-between mt-1">
            <p className="text-white/60 hidden lg:block text-sm">نمای کلی کالا و خدمات </p>
            <div className="flex gap-3">
              {/* جدید */}
              <button className="btn-custom" onClick={() => setModalOpen(true)}>
                جدید
                <span className="inline-block">
                  <HiOutlinePlusSm className="w-5 h-5" />
                </span>
              </button>
              {/* از اکسل */}
              <button
                className="btn-custom"
                 onClick={() => setExcelModalOpen(true)}
              
              >
                از اکسل
                <span className="inline-block">
                  <GrDocumentExcel className="w-5 h-5" />
                </span>
              </button>
              {/* به اکسل */}
              <button
              onClick={handleExportExcel}
              className="btn-custom">
                به اکسل
                <span className="inline-block">
                  <GrDocumentExcel className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 px-2 lg:px-7">
      <p className="text-white text-base mt-1"> اعمال فیلتر</p>
        <div className="rounded-xl border border-white/10 bg-white/5 mt-8 p-3 grid grid-cols-2 md:grid-cols-3 gap-4">
        
          <div>
            <label className="block mb-1 text-white text-sm">نام</label>
            <input
              name="title"
              value={filterInputs.title}
              onChange={e => setFilterInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
        
          <div>
            <label className="block mb-1 text-white text-sm">کد شناسه</label>
            <input
              name="sstid"
              value={filterInputs.sstid}
              onChange={e => setFilterInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              type="number"
              maxLength={10}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 }`}
            />
         
          </div>
        <div className="block lg:hidden"></div>
         
         
          <div className="flex items-end justify-end w-full gap-2">
          <button 
          className="btn-custom3-small2 lg:btn-custom3 cursor-pointer"
            onClick={() => {
          setFilterInputs(initialFilters); 
             setActiveFilters({});         
         }}>پاک کردین فیلترها</button>
          <button className="btn-custom3-small2 lg:btn-custom3 cursor-pointer"  onClick={() => setActiveFilters({ ...filterInputs })}>ارسال فیلتر</button>
          </div>
        </div> 
      </div>
      <div className="mx-auto p-6">
        <ServicesTable 
        setDataTable={setDataTable}
        dataTable ={dataTable}
        setRefresh = {setRefresh}
        refresh={refresh}
        loading={loading}
        units={units} 
        />
      </div>
        <Pagination
        meta={meta}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
      />
    </div>
  );
}
