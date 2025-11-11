import React from 'react';
import PropTypes from "prop-types";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function TransactionModal({ transaction , onClose , loading }) {

  return (
    <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
       >
         <div
           className="w-full max-w-2xl flex flex-col rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
           onClick={(e) => e.stopPropagation()}
         >
           {/* Header */}
           <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
             <div className="flex items-center gap-3">
             
               <span className="text-white text-lg font-bold">لیست تراکنشهای فاکتور </span>
             </div>
             <button
               onClick={onClose}
               className="text-white/80 hover:text-white transition-colors"
             >
              X
             </button>
           </div>
          <div className="overflow-x-auto nice-scrollbar rounded-b-2xl border border-white/10 bg-white/5 relative">
                {loading && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
                   <Spinner />
                 </div>
               )}
               <table 
                 className={`min-w-full text-white ${
                   loading ? "opacity-30 pointer-events-none" : ""
                 }`}
               >
                 <thead>
                   <tr className="text-white/80 text-sm bg-[#181f3a]">
                     <th className="text-right px-4 py-3 whitespace-nowrap">#</th>
                              <th className="text-right px-4 py-3 whitespace-nowrap"> سرویس دهنده </th>
                     <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ تراکنش </th>
                     <th className="text-right px-4 py-3 whitespace-nowrap">کد پیگیری </th>
                     <th className="text-right px-4 py-3 whitespace-nowrap">  بانک   </th>
                       <th className="text-center px-4 py-3 whitespace-nowrap">وضعیت</th>
                         <th className="text-center px-4 py-3 whitespace-nowrap">مبلغ  </th>
                   </tr>
                 </thead>
                 <tbody>
                   {(!transaction || transaction.length === 0) && (
                     <tr>
                       <td
                         colSpan={4}
                         className="px-4 py-6 text-center text-white/60 text-sm"
                       >
                         موردی ثبت13 نشده است.
                       </td>
                     </tr>
                   )}
                   {transaction.map((r, i) => (
                     <tr
                       key={r.id ?? i}
                       className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
                     >
                       <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                         {r?.id}
                       </td>
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                         {r?.provider_label}
                       </td>
                       <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                         {r?.j_date}
                       </td>
                       <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                         {r?.tracking_code} 
                       </td>
                       <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                         {r?.bank_label}
                       </td>
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                         {r?.status_label}
                       </td>
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                         {new Intl.NumberFormat('fa-IR').format(r?.amount)}
                       </td>
                      
                      
                     </tr>
                   ))}
                 </tbody>
               </table>
            
                 {/* <Pagination
                 meta={meta}
                 pageCount={pageCount}
                 setPageCount={setPageCount}
                 setLoading={setLoading}
               /> */}
             </div>
           </div>
         
   </div>

    
  );
}


TransactionModal.propTypes = {
  transaction: PropTypes.array,
onClose: PropTypes.func,
loading :PropTypes.bool
};
