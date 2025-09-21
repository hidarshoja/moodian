import Spinner from "../utils/Spinner";
import { formatDateToYMD   } from "../utils/change-date";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';

export default function SendInvoicesTable({
  records,
  loading
}) {

    const handleDelete = async (row) => {
    try {
      const res = await axiosClient.delete(`/invoices/${row.id}`);
      console.log(`Delete response:`, res);

    //  setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: 'top-start', 
        icon: 'success', // یا 'error'
        title: 'محصول با موفقیت حذف شد',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
  
    
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: 'top-start',
        icon: 'error',
        title: 'خطا در حذف محصول',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
    }
   
   
  };



  const handleEdit = async (row) => {
   
      try {
      const payload = { id: row.id, ...row };
      const { data } = await axiosClient.put(
        `/invoices/${payload.id}`,
        payload
      );
   //   setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: 'top-start', 
        icon: 'success', // یا 'error'
        title: 'محصول با موفقیت ویرایش شد',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
   
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: 'top-start',
        icon: 'error',
        title: 'خطا در ویرایش محصول',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
    }
   
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative">
       {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          <Spinner />
        </div>
      )}
      <table  className={`min-w-full text-white ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}>
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap"> وضعیت  </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            شماره منحصر به فرد مالیاتی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
               مشتری
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
           تاریخ صدور
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
               مبلغ کل
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">نوع</th>
             <th className="text-right px-4 py-3 whitespace-nowrap">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-6 text-center text-white/60 text-sm"
              >
                موردی ثبت نشده است.
              </td>
            </tr>
          )}
          {records.map((r, i) => (
            <tr
              key={i}
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.status_label }
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.inp === 1 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
              {r?.customer?.name}{" "}{r?.customer?.last_name}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
              { formatDateToYMD(r.created_at)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
              {r.inp === 4 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                {r.asn}
              </td>
              
            <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                   <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 rounded hover:bg-red-500/20 text-red-500"
                  onClick={() => handleDelete(r)}
                 
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <button
                  className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                  onClick={() => handleEdit(r)}
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
