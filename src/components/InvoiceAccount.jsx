import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {convertToPersianDate} from "../utils/change-date";
import { IoMdAlert } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import TransactionModal from '../components/TransactionModal';
import AssignModal from "./AssignModal";
import axiosClient from "../axios-client";
import { MdAssignmentAdd } from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import Pagination from "../components/Pagination";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}


export default function InvoiceAccount({invoiceData, loading , refresh , setRefresh , setLoading , meta3 , pageCount3 ,setPageCount3}) {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
   const [assignData, setAssignData] = useState([]);
   const[loading2 , setLoading2] = useState(false);
   const[loading3 , setLoading3] = useState(false);
const[idActive , setIdActive] = useState(null);
     const [meta, setMeta] = useState({});
const[activeAccount , setActiveAccount] = useState([]);
const[pageCount2 , setPageCount2] = useState(1);
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
    if(r){
      setIdActive(r.id);
    }
    setAssignModalOpen(true);
   setLoading3(true);
axiosClient.get(`/transactions?page=${pageCount2}&f[coefficient]=1&f[sum_invoices] = <,amount,${r.id}`)
.then((response) => {
      setAssignData(response?.data?.data);
       setMeta(response.data.meta);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading3(false);
    })

  };

  useEffect(() => {
    if(idActive){
      handleShowAssign();
    }
  }, [pageCount2]);

  const handleResponse = () => {
    // axiosClient.get(`/transactions`).then((response) => {
    //   setAssignData(response?.data?.data);
    //    setMeta(response.data.meta);
    // });
  };

  const handleCloseTransactionModal = () => {
    setTransactionModalOpen(false);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
  };
  
useEffect(() => {
  if(idActive){
    axiosClient.get(`/invoices/${idActive}`)
    .then((response) => {
      setActiveAccount(response?.data?.transactions);
    });   
  }else{
    handleResponse();
  }
  }, [idActive , refresh]);
 

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mt-6"> فاکتور با حساب</h1>
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
          <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th className="text-right px-4 py-3 whitespace-nowrap">#</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ صدور</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">نام مشتری</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">شماره فاکتور مودیان</th>
              <th className="text-center px-4 py-3 whitespace-nowrap">وضعیت</th>
                 <th className="text-center px-4 py-3 whitespace-nowrap">مبلغ </th>
                    <th className="text-center px-4 py-3 whitespace-nowrap">مجموع تراکنش ها </th>
                <th className="text-center px-4 py-3 whitespace-nowrap">دارای تراکنش</th>
                <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th className="text-center px-2 py-3 whitespace-nowrap border-r border-white/10 relative"
               style={{
                position: "sticky",
                left: 0,
                backgroundColor: "#181f3a",
                zIndex: 10,
                minWidth: "70px",
                boxShadow: "10px 0 20px rgba(24, 31, 58, 1)",
              }}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {(!invoiceData || invoiceData.length === 0) && (
            <tr>
              <td
                colSpan={8}
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
               <td className="p-2 text-center"></td>
              <td className="px-4 py-3 text-center text-white/90 text-sm whitespace-nowrap">
                {r?.id}
              </td>
              <td className="px-4 py-3 text-center text-white/90 text-sm whitespace-nowrap">
                {convertToPersianDate(r?.created_at)}
              </td>
              <td className="px-4 py-3 text-center text-white/90 text-sm whitespace-nowrap">
                {r?.customer?.name} -  {r?.customer?.last_name}
              </td>
              <td className="px-4 py-3 text-center text-white/90 text-sm whitespace-nowrap">
                {r?.taxid}
              </td>
               <td className="px-4 py-3 text-center text-white/90 text-sm whitespace-nowrap">
                {r?.status_label}
              </td>
               <td className="px-4 py-3 text-center text-white/90 text-sm whitespace-nowrap">
             
                  {Number(r?.tadis).toLocaleString()}
              </td>
               <td className="px-4 py-3 text-center text-white/90 text-sm whitespace-nowrap">
                {Number(r?.sum_transactions_assigned_amount).toLocaleString()}
              </td>
               <td className="px-4 py-3 text-white/90 text-sm flex items-center justify-center whitespace-nowrap">
               
                {Number(r?.sum_transactions_assigned_amount) == 0 ? <IoCloseCircle className="text-red-500 w-5 h-5"/> : ""}
                {r?.tadis  <= Number(r?.sum_transactions_assigned_amount) ?
                 <IoMdCheckmarkCircle className="text-green-500 w-5 h-5"/> :(Number(r?.sum_transactions_assigned_amount) > 0  ? <IoMdAlert className="text-yellow-500 w-5 h-5"/> : "")
                  }
              
              </td>
              <td className="p-2 text-center"></td>
              <td 
                 className="px-2 py-3 text-sm border-r border-white/5 relative flex items-center justify-center"
                 style={{
                   position: "sticky",
                   left: 0,
                   zIndex: 10,
                   minWidth: "160px",
                   backgroundColor: "rgb(27, 33, 60)",
                   boxShadow: "10px 0 20px rgba(0, 0, 0, 0.5)",
                 }}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleShowTransaction(i, r)}
                     className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/15 transition-colors"
                  >
               <FaReceipt />
                  </button>
                  <button
                   onClick={() => handleShowAssign?.(i , r)}
                    className="p-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/15"
                  >
                   <MdAssignmentAdd />
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
        <AssignModal
         transaction={assignData}
        meta={meta}
        onClose={handleCloseAssignModal}
        idActive={idActive}
        activeAccount={activeAccount}
        refresh={refresh}
        setRefresh={setRefresh}
        setPageCount2={setPageCount2}
        pageCount2={pageCount2}
        loading3={loading3}
        />
      )}
    </div>
      <div className="w-full flex items-center justify-center">
      <Pagination
        meta={meta3}
        pageCount={pageCount3}
        setPageCount={setPageCount3}
        setLoading={setLoading}
      />
      </div>
    </div>
  )
}


InvoiceAccount.propTypes = {
  invoiceData: PropTypes.array,
onShow: PropTypes.func,
onAssign: PropTypes.func,
loading :PropTypes.bool,
refresh :PropTypes.bool,
setRefresh:PropTypes.func,
setLoading:PropTypes.func,
meta3:PropTypes.object,
pageCount3:PropTypes.number,
setPageCount3:PropTypes.func
};
