import React from 'react'
import { GoKey } from "react-icons/go";
import { convertToPersianDate } from "../utils/change-date";
import { GrDocumentExcel } from "react-icons/gr";
import axiosClient from "../axios-client";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function TableExeel({ records , loading , setRefresh  , refresh }) {

const handleDownload = async (number) => {
  try {
    const response = await axiosClient.get(`/import-exports/${number}/download`, {
      responseType: "blob", 
    });

  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    
    link.setAttribute("download", `export_${number}.xlsx`);
    document.body.appendChild(link);
    link.click();

   
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};



const handleDelete = async (row) => {
  try {
    const res = await axiosClient.delete(`/import-exports/${row}`);
 

    setRefresh(!refresh);
    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "success", // یا 'error'
      title: "فایل اکسل با موفقیت حذف شد",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-toast",
      },
    });
  
  } catch (error) {
    console.log(`error`, error);
    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "error",
      title: "خطا در حذف اکسل",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-toast",
      },
    });
  }
};

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative">
       {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          <Spinner />
        </div>
      )}
         <table    className={`min-w-full text-white ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}>
           <thead>
             <tr className="text-white/80 text-sm bg-[#181f3a]">
               <th className="text-right px-4 py-3 whitespace-nowrap">آیدی</th>
               <th className="text-right px-4 py-3 whitespace-nowrap">
                 نوع
               </th>
               <th className="text-right px-4 py-3 whitespace-nowrap">
                وضعیت
               </th>
               <th className="text-right px-4 py-3 whitespace-nowrap">
                از محل
               </th>
               <th className="text-right px-4 py-3 whitespace-nowrap">
                 تاریخ
               </th>
               <th className="text-right px-4 py-3 whitespace-nowrap">دانلود</th>
             
             </tr>
           </thead>
           <tbody>
             {records?.length === 0 && (
               <tr>
                 <td
                   colSpan={9}
                   className="px-4 py-6 text-center text-white/60 text-sm"
                 >
                   موردی ثبت نشده است.
                 </td>
               </tr>
             )}
             {[...records]?.reverse().map((r, i) => (
               <tr
                 key={i}
                 className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
               >
                 <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                   {r?.id}
                 </td>
                 <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                   {r?.type_label}
                 </td>
                 <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                   {r?.status_label ? r?.status_label : "-"}
                 </td>
                 <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                   {r?.entity_type_label}
                 </td>
                 <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                   {convertToPersianDate(r?.created_at)}
                 </td>
                
                 <td className="px-2 py-2">
                   <div className="flex items-center justify-start gap-2">
                     <button
                       onClick={() => handleDownload(r.id)}
                       title="دانلود"
                       className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/15"
                     >
                       <GrDocumentExcel width={20} height={20} />
                     </button>

                     <button
                       onClick={() => handleDelete(r.id)}
                       title="حذف"
                       className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15"
                     >
                       <MdDeleteOutline width={20} height={20} />
                     </button>
                   
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
  )
}
