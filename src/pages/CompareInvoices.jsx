
import { useState , useEffect } from "react";
import axiosClient from "../axios-client";
import InvoiceAccountTable from "../components/InvoiceAccountCompare";
import AccountInvois from "../components/AccountInvoisCompare";
import AccountInvoisAll from "../components/AccountInvoisAllCompare";
import FactorInvoice from "../components/FactorInvoiceCompare";

export default function CompareInvoices() {
 const [activeBtn , setActiveBtn] = useState("invoiceAccount");
const [invoiceData , setInvoiceData] = useState([]);
const [transactionData2 , setTransactionData2] = useState([]);
const [transactionDataAll , setTransactionDataAll] = useState([]);
const [meta2, setMeta2] = useState({});
const [pageCount, setPageCount] = useState(1);
const [loading, setLoading] = useState(true);
const[refresh , setRefresh] = useState(false);
const [meta3, setMeta3] = useState({});
const [pageCount3, setPageCount3] = useState(1);
const [factorData, setFactorData] = useState([]);
//خرید با فروش
   useEffect(() => {
     setLoading(true);
     axiosClient.get(`/invoices?page=${pageCount3}&f[sum_associated_sales]=<,tadis&f[type]=1&include=sum_associated_sales`)
     .then((response) => {
      setInvoiceData(response.data.data);
       setMeta3(response.data.meta);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh,pageCount3]);

  //  فروش با خرید
 
   useEffect(() => {
     setLoading(true);
     axiosClient.get(`/invoices?page=${pageCount}&f[sum_associated_purchases]=<,tadis&f[type]=-1&include=sum_associated_purchases`)
     .then((response) => {
      setTransactionData2(response.data.data);
        setMeta2(response.data.meta);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
   
  }, [pageCount,refresh]);
  
// تعیین تکلیف شده خرید
   useEffect(() => {
     setLoading(true);
     axiosClient.get(`/invoices?page=${pageCount}&f[sum_associated_sales]=>=,tadis&f[type]=1&include=sum_associated_sales`)
     .then((response) => {
      setTransactionDataAll(response.data.data);
        setMeta2(response.data.meta);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
   
  }, [pageCount,refresh]);

// تعیین تکلیف شده فروش
  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/invoices?page=${pageCount3}&f[sum_associated_purchases]=>=,tadis&f[type]=-1&include=sum_associated_purchases`)
    .then((response) => {
     setFactorData(response.data.data);
     setMeta3(response.data.meta);
   })
   .catch((error) => {
       console.error("Error fetching data:", error);
     })
     .finally(() => setLoading(false));
  
 }, [pageCount,refresh]);

   

 return (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
  <div>
    <div className="w-full border-b border-white/10 p-6">
      <h1 className="text-white text-2xl font-bold">تطبیق فاکتور فروش و خرید</h1>
      <p className="text-white/60 text-sm mt-1">نمای کلی تطبیق فاکتور فروش و خرید</p>
    </div>
  </div>
<div className="flex flex-col lg:flex-row gap-2 mt-6 px-2">
  <button
     className={`btn-custom6 lg:btn-custom4 ${
            activeBtn === "invoiceAccount" ? "btn-active" : ""
          }`}
  onClick={() => setActiveBtn("invoiceAccount")}
  >
   خرید با فروش
  </button>
  <button
     className={`btn-custom6 lg:btn-custom4 ${
            activeBtn === "accountInvoice" ? "btn-active" : ""
          }`}
  onClick={() => setActiveBtn("accountInvoice")}
  >
  فروش با خرید
  </button>
  <button
  className={`btn-custom6 lg:btn-custom4 ${
            activeBtn === "all" ? "btn-active" : ""
          }`}
  onClick={() => setActiveBtn("all")}
    >
     تعیین تکلیف شده خرید
  </button>
  <button
  className={`btn-custom6 lg:btn-custom4 ${
            activeBtn === "all2" ? "btn-active" : ""
          }`}
  onClick={() => setActiveBtn("all2")}
    >
    تعیین تکلیف شده فروش
  </button>
</div>
      <div className="px-3">
        {activeBtn === "invoiceAccount" && <div className="mt-6">
          <InvoiceAccountTable
             invoiceData={invoiceData}
               loading={loading}
               setRefresh={setRefresh}
               refresh={refresh}
               setLoading={setLoading}
               meta3={meta3}
               pageCount3={pageCount3}
               setPageCount3={setPageCount3}
                />
      
          </div>}
        {activeBtn === "accountInvoice" && <div>
          <AccountInvois
             invoiceData={transactionData2} 
             meta2={meta2}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
               loading={loading}
                setRefresh={setRefresh}
               refresh={refresh}
             />
            </div>}
        {activeBtn === "all" && <div>
          <AccountInvoisAll
              invoiceData={transactionDataAll} 
             meta2={meta2}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
               loading={loading}
                setRefresh={setRefresh}
               refresh={refresh}
            />
          </div>}
          {activeBtn === "all2" && <div>
            <FactorInvoice
               invoiceData={factorData}
               loading={loading}
               setRefresh={setRefresh}
               refresh={refresh}
               setLoading={setLoading}
               meta3={meta3}
               pageCount3={pageCount3}
               setPageCount3={setPageCount3}
            />
          </div>}
      </div>
</div>
)
}