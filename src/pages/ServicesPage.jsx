import ServicesTable from "../components/ServicesTable";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";
import AddServiceModal from "../components/AddServiceModal";
import ImportExcelModal from "../components/ImportExcelModal";
import { exportServicesToExcel } from "../components/exportServicesToExcel";
import { useState , useEffect } from "react";
import axiosClient from "../axios-client";


export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [refresh , setRefresh] = useState(false);
  useEffect(() => {
    axiosClient
      .get("/products")
      .then((response) => {
        setDataTable(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
      });
  }, [refresh]);


  const handleExportExcel = () => {
      exportServicesToExcel(dataTable);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AddServiceModal isOpen={modalOpen} refresh={refresh} setRefresh={setRefresh} onClose={() => setModalOpen(false)} />
      <ImportExcelModal
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">کالا و خدمات</h1>
          <div className="flex  items-center justify-between mt-1">
            <p className="text-white/60 text-sm">نمای کلی کالا و خدمات </p>
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
      <div className="mx-auto p-6">
        <ServicesTable 
        setDataTable={setDataTable}
        dataTable ={dataTable}
        setRefresh = {setRefresh}
        refresh={refresh}
        />
      </div>
    </div>
  );
}
