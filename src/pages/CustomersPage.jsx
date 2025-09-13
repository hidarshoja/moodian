import ServicesTable from "../components/ServicesTable";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";
import AddServiceModal from "../components/AddServiceModal";
import ImportExcelModal from "../components/ImportExcelModal";
import { exportServicesToExcel } from "../components/exportServicesToExcel";
import { useState } from "react";

export default function CustomersPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [dataTable, setDataTable] = useState([
    {
      code: "1234",
      name: "saeeid",
      unit: 3,
      valueAdded: "5555",
      otherTax: "6666",
      legalValue: "77777",
      legalRate: "8888",
      customCode: "9999",
    },
    {
      code: "4321",
      name: "Ali",
      unit: 5,
      valueAdded: "Ali123",
      otherTax: "ali666",
      legalValue: "ali77777",
      legalRate: "ali8888",
      customCode: "ali9999",
    },
  ]);


  // تابع برای گرفتن داده از کامپوننت فرزند
  const handleExportExcel = () => {
      exportServicesToExcel(dataTable);
  };

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AddServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <ImportExcelModal
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
      <div className="mx-auto p-6">
        <ServicesTable 
        setDataTable={setDataTable}
        dataTable ={dataTable}
        />
      </div>
    </div>
  )
}