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
  const [dataTable, setDataTable] = useState([
    // {
    //   name: "سعید",
    //   code: "1234",
    //   typeCustomer: 3,
    //   nationalCode: "5555",
    //   postCode: "6666",
    //   phone: "09376228320",
    //   userCode: "8888",
    // },
    // {
    //   name: "سیاوش",
    //   code: "1357",
    //   typeCustomer: 5,
    //   nationalCode: "Ali123",
    //   postCode: "ali666",
    //   phone: "09232996418",
    //   userCode: "ali8888",
    // },
  ]);

  useEffect(() => {
    axiosClient
      .get("/customers")
      .then((response) => {
        setDataTable(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
      });
  }, []);


  // تابع برای گرفتن داده از کامپوننت فرزند
  const handleExportExcel = () => {
    exportCustomersToExcel(dataTable);
  };

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AddCustomersModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
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
      <div className="mx-auto p-6">
        <CustomersTable 
        setDataTable={setDataTable}
        dataTable ={dataTable}
        />
      </div>
    </div>
  )
}