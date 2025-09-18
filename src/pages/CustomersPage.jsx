import CustomersTable from "../components/CustomersTable";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";
import AddCustomersModal from "../components/AddCustomersModal";
import ImportExcelModalUser from "../components/ImportExcelModalUser";
import { exportCustomersToExcel } from "../components/exportServicesToExcel";
import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

export default function CustomersPage() {
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const initialFilters = {
    name: "",
    last_name: "",
    national_code: "",
    tel: "",
    type: "",
  };
  const [filterInputs, setFilterInputs] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState({});
  const customerTypes = [
    { id: 0, name: "انتخاب ..." },
    { id: 1, name: "حقیقی" },
    { id: 2, name: "حقوقی" },
    { id: 3, name: "مشارکت مدنی" },
    { id: 4, name: "اتباع غیر ایرانی" },
  ];
  useEffect(() => {
    setLoading(true);
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

    const query = buildFilterQuery(activeFilters);
    axiosClient
      .get(`/customers?page=${pageCount}${query}`)
      .then((response) => {
        setDataTable(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh, activeFilters, pageCount]);

  // تابع برای گرفتن داده از کامپوننت فرزند
  const handleExportExcel = () => {
    exportCustomersToExcel(dataTable);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AddCustomersModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <ImportExcelModalUser
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">مشتری</h1>
          <div className="flex  items-center justify-between mt-1">
            <p className="text-white/60 text-sm mt-1">نمای کلی مشتری ها</p>
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
              <button onClick={handleExportExcel} className="btn-custom">
                به اکسل
                <span className="inline-block">
                  <GrDocumentExcel className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-2 px-2 lg:px-7">
          <p className="text-white text-base mt-1"> اعمال فیلتر</p>
          <div className="rounded-xl border border-white/10 bg-white/5 mt-8 p-3 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-white text-sm">نام</label>
              <input
                name="name"
                value={filterInputs.name}
                onChange={(e) =>
                  setFilterInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="block mb-1 text-white text-sm">
                نام خانوادگی
              </label>
              <input
                name="last_name"
                value={filterInputs.last_name}
                onChange={(e) =>
                  setFilterInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="block mb-1 text-white text-sm">
                کدملی/شناسه
              </label>
              <input
                name="national_code"
                value={filterInputs.national_code}
                onChange={(e) =>
                  setFilterInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                type="number"
                maxLength={10}
                className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 }`}
              />
            </div>
            <div>
              <label className="block mb-1 text-white text-sm">
                شماره تماس
              </label>
              <input
                name="tel"
                value={filterInputs.tel}
                onChange={(e) =>
                  setFilterInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="block mb-1 text-white text-sm">
                {" "}
                نوع مشتری
              </label>
              <select
                name="type"
                value={filterInputs.type}
                onChange={(e) =>
                  setFilterInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                {customerTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-end w-full gap-2">
              <button
                className="btn-custom"
                onClick={() => {
                  setFilterInputs(initialFilters);
                  setActiveFilters({});
                }}
              >
                پاک کردین فیلترها
              </button>
              <button
                className="btn-custom"
                onClick={() => setActiveFilters({ ...filterInputs })}
              >
                ارسال فیلتر
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto p-6">
        <CustomersTable
          setDataTable={setDataTable}
          dataTable={dataTable}
          refresh={refresh}
          setRefresh={setRefresh}
          loading={loading}
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
