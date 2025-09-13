import SupportTable from "../components/SupportTable";
import { HiOutlinePlusSm } from "react-icons/hi";
import AddSupportModal from "../components/AddSupportModal";
import { useState } from "react";

export default function SupportPage() {
 const [modalOpen, setModalOpen] = useState(false);
 const [dataTable, setDataTable] = useState([
   {
     contractNumber: "خرید",
     title: "09159886128",
     customer: 3,
     
   },
   {
     contractNumber: "فروش",
     title: "09376228320",
     customer: 1,
     
   },
 ]);


  return (
 <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
 <AddSupportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
 
 <div>
   <div className="w-full border-b border-white/10 p-6">
   <h1 className="text-white text-2xl font-bold">پشتیبانی</h1>
     <div className="flex  items-center justify-between mt-1">
     <p className="text-white/60 text-sm mt-1">نمای کلی پشتیبانی کاربران</p>
       <div className="flex gap-3">
         {/* جدید */}
         <button className="btn-custom" onClick={() => setModalOpen(true)}>
           جدید
           <span className="inline-block">
             <HiOutlinePlusSm className="w-5 h-5" />
           </span>
         </button>
         
       </div>
     </div>
   </div>
 </div>
 <div className="mx-auto p-6">
   <SupportTable 
   setDataTable={setDataTable}
   dataTable ={dataTable}
   />
 </div>
</div>
  )
}
