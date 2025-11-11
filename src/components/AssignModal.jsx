import React from 'react';
import Pagination from "../components/Pagination";
import PropTypes from "prop-types";
import { IoMdAlert } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import axiosClient from "../axios-client";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function AssignModal({ transaction , onClose , loading , meta , setPageCount , pageCount , setLoading}) {

console.log(`meta`, meta);
  const handleShowAssign = (i, r) => {
   
axiosClient.get(`/transactions`).then((response) => {
  console.log(`response.data`, response.data);
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
          <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5  relative">
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
                      <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ تراکنش </th>
                      <th className="text-right px-4 py-3 whitespace-nowrap">کد پیگیری </th>
                      <th className="text-right px-4 py-3 whitespace-nowrap">  بانک   </th>
                        <th className="text-center px-4 py-3 whitespace-nowrap">وضعیت</th>
                          <th className="text-center px-4 py-3 whitespace-nowrap">مبلغ  </th>
                             <th className="text-center px-4 py-3 whitespace-nowrap">دارای فاکتور</th>
                      <th className="text-center px-4 py-3 whitespace-nowrap">عملیات</th>
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
                          {r?.id}
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
                        <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                          {r?.amount  == r?.sum ? <IoMdCheckmarkCircle className="text-green-500"/> : ""}
                          {r?.sum == 0 ? <IoCloseCircle className="text-red-500"/> : ""}
                          {r?.sum > 0 && r?.amount > r?.sum ? <IoMdAlert className="text-yellow-500"/> : ""}
                        </td>
                         <td className="px-2 py-2">
                          <div className="flex items-center justify-center gap-2">
                          
                            <button
                             onClick={() => handleShowAssign?.(i , r)}
                             
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15"
                            >
                             اساین کردن 
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             
                  <Pagination
                  meta={meta}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                  setLoading={setLoading}
                />
              </div>
           </div>
         
   </div>

    
  );
}


AssignModal.propTypes = {
  transaction : PropTypes.array,
  loading : PropTypes.bool,
  onClose:PropTypes.func,
  meta:PropTypes.object,
  pageCount:PropTypes.number,
  setPageCount:PropTypes.func,
  setLoading:PropTypes.func,

};