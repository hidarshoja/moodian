import  { useState , useEffect } from 'react';
import Pagination from "./Pagination";
import PropTypes from "prop-types";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import {convertToPersianDate} from "../utils/change-date";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function AssignModalNew({ transaction , onClose , loading , meta , setPageCount , pageCount , setLoading , idActive , activeAccount}) {
  const [selectedTransactions, setSelectedTransactions] = useState([]);

    useEffect(() => {
    if (activeAccount && activeAccount.length > 0) {
      const activeIds = activeAccount.map(acc => acc.id);
      setSelectedTransactions(activeIds);
    }
  }, [activeAccount]);

  const handleCheckboxChange = (id) => {
    setSelectedTransactions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleShowAssign = () => {
     const invoices = selectedTransactions;
axiosClient.post(`/transactions/${idActive}/assign-invoices` , {invoices})
.then((response) => {
  console.log(`response`, response);
  Swal.fire({
    icon: 'success',
    title: 'موفقیت آمیز',
    text: 'عملیات با موفقیت انجام شد',
  })
  onClose();
    })
      .catch((err) => {
        console.error("Error assigning transactions:", err);
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'عملیات با خطا مواجه شد',
        })
      });

  };

  return (
    <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
       >
         <div
           className="w-full max-w-5xl flex flex-col rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
           onClick={(e) => e.stopPropagation()}
         >
              {/* Header */}
           <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
             <div className="flex items-center gap-3">
             
               <span className="text-white text-lg font-bold">اساین فاکتور</span>
             </div>
             <button
               onClick={onClose}
               className="text-white/80 hover:text-white transition-colors"
             >
              X
             </button>
           </div>
          <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 p-3  relative">
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
                    <th className="text-right px-4 py-3 whitespace-nowrap"></th>
                      <th className="text-right px-4 py-3 whitespace-nowrap">#</th>
                      <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ صدور </th>
                      <th className="text-right px-4 py-3 whitespace-nowrap">نام مشتری </th>
                      <th className="text-right px-4 py-3 whitespace-nowrap">  txid   </th>
                        <th className="text-center px-4 py-3 whitespace-nowrap">وضعیت</th>
                          <th className="text-center px-4 py-3 whitespace-nowrap">مبلغ کل  </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!transaction || transaction.length === 0) && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-6 text-center text-white/60 text-sm"
                        >
                          موردی ثبت نشده است.
                        </td>
                      </tr>
                    )}
                    {transaction.map((r, i) => (
                      <tr
                        key={r.id ?? i}
                        className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
                      >
                           <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                           <input
                      type="checkbox"
                      checked={selectedTransactions.includes(r.id)}
                      onChange={() => handleCheckboxChange(r.id)}
                    />
                        </td>
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                          {r?.id}
                        </td>
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                          {convertToPersianDate(r?.indatim)}
                        </td>
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                          {r?.customer?.name} - {r?.customer?.last_name}
                        </td>
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                          {r?.taxid}
                        </td>
                         <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                          {r?.status_label}
                        </td>
                         <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                          {new Intl.NumberFormat('fa-IR').format(r?.tadis)}
                        </td>
                        
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
             <div className='w-full flex items-center justify-end'>
               <div className="flex items-center  gap-2 w-full">
                <div className='w-2/5'></div>
                 <div className='w-1/5 flex items-center justify-center '>
                             <Pagination
                  meta={meta}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                  setLoading={setLoading}
                />
                 </div>
                 <div className='w-1/5'></div>
                 <div className='w-1/5 flex items-center justify-end'>
                  
                            <button
                             onClick={handleShowAssign}
                             
                              className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-red-500/20 hover:bg-red-500/15"
                            >
                             ذخیره کردن 
                            </button>
                 </div>
                          </div>
                
             </div>
              </div>
           </div>
         
   </div>

    
  );
}


AssignModalNew.propTypes = {
  transaction : PropTypes.array,
  loading : PropTypes.bool,
  onClose:PropTypes.func,
  meta:PropTypes.object,
  pageCount:PropTypes.number,
  setPageCount:PropTypes.func,
  setLoading:PropTypes.func,
  idActive:PropTypes.number,
  activeAccount:PropTypes.array,
};