import { useState , useEffect } from "react";
import axiosClient from "../axios-client";
import InvoiceAccountTable from "../components/invoiceAccount";


export default function ContradictionPage() {
 const [activeBtn , setActiveBtn] = useState("invoiceAccount");
const [invoiceData , setInvoiceData] = useState([]);
const [transactionData2 , setTransactionData2] = useState([]);


   useEffect(() => {
     axiosClient.get("/invoices").then((response) => {
     console.log(`response.data.data`, response.data.data);
      setInvoiceData(response.data.data);
    });
  }, []);

    
 
   useEffect(() => {
     axiosClient.get("/transactions").then((response) => {
     console.log(`response.data.data`, response.data.data);
      setTransactionData2(response.data.data);
    });
  }, []);

   

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
  className="btn-custom4"
  onClick={() => setActiveBtn("invoiceAccount")}
  >
    فاکتور با حساب
  </button>
  <button
  className="btn-custom4"
  onClick={() => setActiveBtn("accountInvoice")}
  >
  حساب با فاکتور
  </button>
  <button
  className="btn-custom4"
  onClick={() => setActiveBtn("all")}
    >
    همه
  </button>
</div>
      <div className="px-3">
        {activeBtn === "invoiceAccount" && <div className="mt-6">
          <InvoiceAccountTable invoiceData={invoiceData} />
          </div>}
        {activeBtn === "accountInvoice" && <div>حساب با فاکتور</div>}
        {activeBtn === "all" && <div>همه</div>}
      </div>
</div>
)
}
