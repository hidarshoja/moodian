import React from 'react';

export default function AssignModal({ transaction , onClose }) {

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
             
               <span className="text-white text-lg font-bold">جزئیات مشتری</span>
             </div>
             <button
               onClick={onClose}
               className="text-white/80 hover:text-white transition-colors"
             >
              X
             </button>
           </div>
          <div className="grid grid-cols-2 gap-4 p-2">
         
           
             {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80">شناسه مشتری:</span>
               <span className="text-white">{transaction?.customer_id}</span>
             </div>
             {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80">شماره سریال:</span>
               <span className="text-white">{transaction?.serial_number}</span>
             </div>
             {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80"> شماره اقتصادی فروشنده:</span>
               <span className="text-white">{transaction?.tins}</span>
             </div>
             {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80">وضعیت:</span>
               <span className="text-white">{transaction?.status_label}</span>
             </div>
          
                {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80"> الگوی صورتحساب:</span>
               <span className="text-white">{transaction?.inp_label}</span>
             </div>
             {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80"> موضوع صورتحساب:</span>
               <span className="text-white">{transaction?.ins_label}</span>
             </div>
             {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80">   نوع صورتحساب:</span>
               <span className="text-white">{transaction?.inty_label}</span>
             </div>
             {/* Row */}
             <div className="flex items-center gap-3 border border-white/10 p-2 rounded-md">
               <span className="text-white/80">نوع شخص خریدار:</span>
               <span className="text-white">{transaction?.tob_label}</span>
             </div>
          </div>
           </div>
         
   </div>

    
  );
}