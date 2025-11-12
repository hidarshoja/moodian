import PropTypes from "prop-types";
import  { useEffect, useState } from "react";
import { IoMdAlert } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import TransactionModalNew from './TransactionModalNew';
import AssignModalNew from "./AssignModalNew";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";
import { MdAssignmentAdd } from "react-icons/md";
import { FaReceipt } from "react-icons/fa";


function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function AccountInvois({invoiceData  , pageCount ,setPageCount , setLoading , loading , refresh , setRefresh , meta2}) {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
   const [assignData, setAssignData] = useState([]);
   const[idActive , setIdActive] = useState(null);
   const[activeAccount , setActiveAccount] = useState([]);
   const[pageCount2 , setPageCount2] = useState(1);
      const[loading3 , setLoading3] = useState(false);
       const [meta, setMeta] = useState({});

  const handleShowTransaction = (i, r) => {
    setTransactionModalOpen(true);
axiosClient.get(`/transactions/${r.id}`)
.then((response) => {
      setTransactionData(response?.data?.invoices);
      
    }).catch((error) => {
      console.log(error);
    })

  };

   const handleShowAssign = (r) => {
    if(r){
      setIdActive(r.id);
    }
    setAssignModalOpen(true);
   setLoading3(true);
axiosClient.get(`/invoices?page=${pageCount2}`)
.then((response) => {
      setAssignData(response?.data?.data);
        setMeta(response?.data?.meta);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading3(false);
    })

  };

  const handleCloseTransactionModal = () => {
    setTransactionModalOpen(false);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
  };

  useEffect(() => {
    if(idActive){
      handleShowAssign();
    }
  }, [pageCount2]);

   const handleResponse = () => {
    axiosClient.get(`/invoices`).then((response) => {
      setAssignData(response?.data?.data);
    });
  };

 useEffect(() => {
  if(idActive){
    axiosClient.get(`/transactions/${idActive}`)
    .then((response) => {
      setActiveAccount(response?.data?.invoices);
    });   
  }else{
    handleResponse();
  }
  }, [idActive,refresh]);

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mt-6"> حساب با فاکتور</h1>
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
                <th className="text-center px-4 py-3 whitespace-nowrap">مجموع فاکتور  </th>
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
                 {new Intl.NumberFormat('fa-IR').format(r?.invoices_sum_tadis)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
               {Number(r?.invoices_sum_tadis) == 0 && <IoCloseCircle className="text-red-500 w-5 h-5"/> }
                {r?.amount  <= Number(r?.invoices_sum_tadis) ? <IoMdCheckmarkCircle className="text-green-500 w-5 h-5"/> :(Number(r?.invoices_sum_tadis) > 0 && <IoMdAlert className="text-yellow-500 w-5 h-5"/>) }
               
                {/* {Number(r?.invoices_sum_tadis) > 0 && <IoMdAlert className="text-yellow-500 w-5 h-5"/>} */}
              </td>
               <td className="px-2 py-2">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleShowTransaction(i, r)}
                  className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/15 transition-colors"
                  >
               <FaReceipt />
                  </button>
                  <button
                    onClick={() => handleShowAssign?.( r)}
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
        <TransactionModalNew 
            transaction={transactionData}
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
        meta={meta2}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
      />
    </div>
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
loading :PropTypes.bool,
refresh :PropTypes.bool,
setRefresh:PropTypes.func,
meta2:PropTypes.object
};
