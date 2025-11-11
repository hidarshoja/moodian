import { useState , useEffect } from "react";
import axiosClient from "../axios-client";
import InvoiceAccountTable from "../components/invoiceAccount";
import AccountInvois from "../components/AccountInvois";

export default function ContradictionPage() {
 const [activeBtn , setActiveBtn] = useState("invoiceAccount");
const [invoiceData , setInvoiceData] = useState([]);
const [transactionData2 , setTransactionData2] = useState([]);
  const [meta, setMeta] = useState({});
 const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const[refresh , setRefresh] = useState(false);

   useEffect(() => {
     axiosClient.get("/invoices").then((response) => {
      setInvoiceData(response.data.data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh]);

    
 
   useEffect(() => {
     setLoading(true);
     axiosClient.get(`/transactions?page=${pageCount}`).then((response) => {
    
      setTransactionData2(response.data.data);
       setMeta(response.data.meta);
    });
  }, [pageCount,refresh]);

   

 return (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
  <div>
    <div className="w-full border-b border-white/10 p-6">
      <h1 className="text-white text-2xl font-bold">مغایرت گیری</h1>
      <p className="text-white/60 text-sm mt-1">نمای کلی مغایرت گیری کاربران</p>
    </div>
  </div>
<div className="flex gap-2 mt-6 px-2">
  <button
     className={`btn-custom4 ${
            activeBtn === "invoiceAccount" ? "btn-active" : ""
          }`}
  onClick={() => setActiveBtn("invoiceAccount")}
  >
    فاکتور با حساب
  </button>
  <button
     className={`btn-custom4 ${
            activeBtn === "accountInvoice" ? "btn-active" : ""
          }`}
  onClick={() => setActiveBtn("accountInvoice")}
  >
  حساب با فاکتور
  </button>
  <button
  className={`btn-custom4 ${
            activeBtn === "all" ? "btn-active" : ""
          }`}
  onClick={() => setActiveBtn("all")}
    >
    همه
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
                />
      
          </div>}
        {activeBtn === "accountInvoice" && <div>
          <AccountInvois
             invoiceData={transactionData2} 
             meta={meta}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setLoading={setLoading}
               loading={loading}
                  setRefresh={setRefresh}
               refresh={refresh}
             />
            </div>}
        {activeBtn === "all" && <div>همه</div>}
      </div>
</div>
)
}
