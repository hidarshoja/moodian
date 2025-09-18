import { useState , useEffect } from "react";
import axiosClient from "../axios-client";
import TableExeel from "../components/TableExeel";
import Pagination from "../components/Pagination";



export default function DownloadExcel() {
const [dataTable, setDataTable] = useState([]);
const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refresh , setRefresh] = useState(false);
  useEffect(() => {
     setLoading(true);

    axiosClient
      .get(`/import-exports?page=${pageCount}`)
      .then((response) => {
        setDataTable(response.data.data);
        setMeta(response.data.meta);
        console.log(`response.data.data`, response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }).finally(() => setLoading(false));
  }, [pageCount , refresh]);
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
       
           <div>
           <TableExeel 
           records={dataTable}
           loading ={loading }
           setRefresh = {setRefresh}
           refresh ={refresh}
           />
           </div> 
          <Pagination
        meta={meta}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
      />
         </div>
         
       </div>
  )
}
