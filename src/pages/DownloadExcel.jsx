import { useState , useEffect } from "react";
import axiosClient from "../axios-client";
import TableExeel from "../components/TableExeel";


export default function DownloadExcel() {
const [dataTable, setDataTable] = useState([]);

   useEffect(() => {

    axiosClient
      .get(`/import-exports`)
      .then((response) => {
        setDataTable(response.data.data);
        console.log(`response.data.data`, response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
       
         <div>
           <div className="w-full border-b border-white/10 p-6">
             <h1 className="text-white text-2xl font-bold">دانلود اکسل </h1>
             <div className="flex  items-center justify-between mt-1">
               <p className="text-white/60 text-sm">نمای کلی  دانلودها  </p>
               
             </div>
           </div>
         </div>
         <div className="py-2 px-2 lg:px-7">
       
           <div className="rounded-xl border border-white/10 bg-white/5 mt-8 ">
           <TableExeel records={dataTable} />
         
           </div> 
         </div>
         
       </div>
  )
}
