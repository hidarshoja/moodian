import CustomersTable from "../components/CustomersTable";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";
import AddCustomersModal from "../components/AddCustomersModal";
import ImportExcelModalUser from "../components/ImportExcelModalUser";
import { exportCustomersToExcel } from "../components/exportServicesToExcel";
import { useState , useEffect } from "react";
import axiosClient from "../axios-client"

export default function CustomersPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [refresh , setRefresh] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/customers")
      .then((response) => {
        setDataTable(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
      });
  }, [refresh]);


  // تابع برای گرفتن داده از کامپوننت فرزند
  const handleExportExcel = () => {
    exportCustomersToExcel(dataTable);
  };

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AddCustomersModal isOpen={modalOpen} onClose={() => setModalOpen(false)} refresh={refresh} setRefresh={setRefresh}/>
      <ImportExcelModalUser
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
      <div>
        <div className="w-full border-b border-white/10 p-6">
        <h1 className="text-white text-2xl font-bold">مشتری</h1>
          <div className="flex  items-center justify-between mt-1">
          <p className="text-white/60 text-sm mt-1">نمای کلی  مشتری ها</p>
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
      <div>
      <div className="py-2 px-2 lg:px-7">
      <p className="text-white/60 text-sm mt-1"> اعمال فیلتر</p>
        <div className="rounded-xl border border-white/10 bg-white/5 mt-8 p-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
            <label className="block mb-1 text-white text-sm"> نوع مشتری</label>
            <select
              name="type"
             
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
             
            </select>
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">نام</label>
            <input
              name="name"
            
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نام خانوادگی
            </label>
            <input
              name="last_name"
              
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">کدملی/شناسه</label>
            <input
              name="national_code"
             
              type="number"
              maxLength={10}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 }`}
            />
         
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">شماره تماس</label>
            <input
              name="tel"
           
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">کدمشتری</label>
            <input
              name="branch_code"
             
              type="number"
              maxLength={4}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 `}
            />
          
          </div>
          <div className="flex items-center justify-end w-full">
          <button className="btn-custom">پاک کردین فیلترها</button>
          </div>
          <div className="flex items-center justify-end w-full">
          <button className="btn-custom">ارسال فیلتر</button>
          </div>
        </div> 
      </div>
      </div>
      <div className="mx-auto p-6">
        <CustomersTable 
        setDataTable={setDataTable}
        dataTable ={dataTable}
        refresh={refresh}
         setRefresh={setRefresh}
        />
      </div>
    </div>
  )
}