import PropTypes from "prop-types";
import {convertToPersianDate} from "../utils/change-date";
import { IoMdAlert } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import  { useState } from 'react';
import TransactionModalNew from './TransactionModalNew';
import AssignModalNew from "./AssignModalNew";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function AccountInvois({invoiceData , meta , pageCount ,setPageCount , setLoading , loading }) {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
   const [assignData, setAssignData] = useState([]);
  const handleShowTransaction = (i, r) => {
    setTransactionModalOpen(true);
axiosClient.get(`/transactions/${r.id}`)
.then((response) => {
  console.log(`response.data`, response.data);
      setTransactionData(response?.data);
      
    }).catch((error) => {
      console.log(error);
    })

  };

   const handleShowAssign = () => {
    setAssignModalOpen(true);
axiosClient.get(`/invoices`).then((response) => {
  console.log(`response.data`, response?.data?.data);
      setAssignData(response?.data?.data);
    });

  };

  const handleCloseTransactionModal = () => {
    setTransactionModalOpen(false);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
  };

 console.log(`transactionData`, transactionData);

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 mt-8 relative">
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
                    onClick={() => handleShowTransaction(i, r)}
                    className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/15"
                  >
              لیست فاکتور
                  </button>
                  <button
                   onClick={ handleShowAssign}
                   
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
        <TransactionModalNew 
            transaction={Array.isArray(transactionData) ? transactionData : [transactionData]}
         onClose={handleCloseTransactionModal} />
      )}
       {assignModalOpen && (
        <AssignModalNew
         transaction={assignData}
          onClose={handleCloseAssignModal}
            meta={meta}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
          />
      )}
        <Pagination
        meta={meta}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
      />
    </div>
  )
}


AccountInvois.propTypes = {
  invoiceData: PropTypes.array,
onShow: PropTypes.func,
onAssign: PropTypes.func,
meta:PropTypes.object,
pageCount:PropTypes.number,
setPageCount:PropTypes.func,
setLoading:PropTypes.func,
loading :PropTypes.bool
};
