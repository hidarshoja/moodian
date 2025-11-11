import PropTypes from "prop-types";
import {convertToPersianDate} from "../utils/change-date";
import { IoMdAlert } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import  { useState } from 'react';
import TransactionModal from '../components/TransactionModal';
import AssignModal from "./AssignModal";
import axiosClient from "../axios-client";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}


export default function InvoiceAccount({invoiceData, loading  }) {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
   const [assignData, setAssignData] = useState([]);
   const[loading2 , setLoading2] = useState(false);
const[idActive , setIdActive] = useState(null);
     const [meta, setMeta] = useState({});
  const handleShowTransaction = (i, r) => {
    setTransactionModalOpen(true);
    setLoading2(true);
axiosClient.get(`/invoices/${r.id}`).then((response) => {
      setTransactionData(response?.data?.transactions);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading2(false);
    })

  };

   const handleShowAssign = (i, r) => {
    setAssignModalOpen(true);
    setIdActive(r.id);
    // صفحه بندی اضافه شود
axiosClient.get(`/transactions`).then((response) => {
  console.log(`response.data.data`, response?.data?.data);
      setAssignData(response?.data?.data);
       setMeta(response.data.meta);
    });

  };

  const handleCloseTransactionModal = () => {
    setTransactionModalOpen(false);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
  };

 

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 mt-6 relative">
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
            <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ صدور</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">نام مشتری</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">شماره فاکتور مودیان</th>
              <th className="text-center px-4 py-3 whitespace-nowrap">وضعیت</th>
                 <th className="text-center px-4 py-3 whitespace-nowrap">مبلغ </th>
                    <th className="text-center px-4 py-3 whitespace-nowrap">مجموع تراکنش ها </th>
                <th className="text-center px-4 py-3 whitespace-nowrap">دارای تراکنش</th>
            <th className="text-center px-4 py-3 whitespace-nowrap">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {(!invoiceData || invoiceData.length === 0) && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-white/60 text-sm"
              >
                موردی ثبت نشده است.
              </td>
            </tr>
          )}
          {invoiceData.map((r, i) => (
            <tr
              key={r.id ?? i}
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.id}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {convertToPersianDate(r?.created_at)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.customer?.name} -  {r?.customer?.last_name}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.taxid}
              </td>
               <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.status_label}
              </td>
               <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
             
                  {Number(r?.tadis).toLocaleString()}
              </td>
               <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {Number(r?.transactions_sum_amount).toLocaleString()}
              </td>
               <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.tadis  == Number(r?.transactions_sum_amount) ? <IoMdCheckmarkCircle className="text-green-500"/> : ""}
                {Number(r?.transactions_sum_amount) == 0 ? <IoCloseCircle className="text-red-500"/> : ""}
                {Number(r?.transactions_sum_amount) > 0  ? <IoMdAlert className="text-yellow-500"/> : ""}
              </td>
              
              <td className="px-2 py-2">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleShowTransaction(i, r)}
                    className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/15"
                  >
                 لیست تراکنش 
                  </button>
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
       {transactionModalOpen && (
        <TransactionModal
         transaction={transactionData}
          onClose={handleCloseTransactionModal} 
          loading={loading2}
           />
      )}
       {assignModalOpen && (
        <AssignModal transaction={assignData}
        meta={meta}
        onClose={handleCloseAssignModal}
        idActive={idActive}
        />
      )}
    </div>
  )
}


InvoiceAccount.propTypes = {
  invoiceData: PropTypes.array,
onShow: PropTypes.func,
onAssign: PropTypes.func,
loading :PropTypes.bool
};
