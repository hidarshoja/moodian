import React from "react";
import { convertToPersianDate } from "../utils/change-date";
import { GrDocumentExcel } from "react-icons/gr";
import axiosClient from "../axios-client";
import { MdDeleteOutline } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import ErrorModal from "./ErrorModal";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

// تابع برای محاسبه درصد و رنگ نوار پیشرفت
const getProgressInfo = (record) => {
  const status = record?.status;
  const errorsCount = record?.errors_count || 0;

  // وضعیت جدید (0)
  if (status === 0) {
    return {
      percentage: 10,
      color: "bg-white/40",
      textColor: "text-white/80",
    };
  }

  // وضعیت در حال پردازش (بین 0 و 100)
  if (status > 0 && status < 100) {
    return {
      percentage: 60,
      color: "bg-orange-500",
      textColor: "text-orange-400",
    };
  }

  // وضعیت انجام شده (100)
  if (status === 100) {
    if (errorsCount > 0) {
      return {
        percentage: 100,
        color: "bg-red-500",
        textColor: "text-red-400",
      };
    } else {
      return {
        percentage: 100,
        color: "bg-green-500",
        textColor: "text-green-400",
      };
    }
  }

  // حالت پیش‌فرض
  return {
    percentage: 0,
    color: "bg-white/20",
    textColor: "text-white/60",
  };
};

export default function TableExeel({ records, loading, setRefresh, refresh }) {
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorsData, setErrorsData] = React.useState([]);

  const handleDownload = async (number) => {
    try {
      const response = await axiosClient.get(
        `/import-exports/${number}/download`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `export_${number}.xlsx`);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axiosClient.delete(`/import-exports/${row}`);

      setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success", // یا 'error'
        title: "فایل اکسل با موفقیت حذف شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "خطا در حذف اکسل",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };
  const handleErrors = async (row) => {
    try {
      const res = await axiosClient.get(`/import-exports/${row}/errors`);
      setErrorsData(res.data.data || []);
      setOpenErrorModal(true);
    } catch (error) {
      setErrorsData([]); // برای نمایش پیام "عروری وجود ندارد"
      setOpenErrorModal(true);
    }
  };

  return (
    <>
      <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative">
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
              <th className="text-right px-4 py-3 whitespace-nowrap">آیدی</th>
              <th className="text-right px-4 py-3 whitespace-nowrap">نوع</th>
              <th className="text-right px-4 py-3 whitespace-nowrap">وضعیت</th>
              <th className="text-right px-4 py-3 whitespace-nowrap">از محل</th>
              <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ</th>
              <th className="text-right px-4 py-3 whitespace-nowrap">دانلود</th>
            </tr>
          </thead>
          <tbody>
            {records?.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-6 text-center text-white/60 text-sm"
                >
                  موردی ثبت نشده است.
                </td>
              </tr>
            )}
            {[...records]?.map((r, i) => (
              <tr
                key={i}
                className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
              >
                <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                  {r?.id}
                </td>
                <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                  {r?.type_label}
                </td>
                <td className="px-4 py-3 text-white/90 text-sm">
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <span className="whitespace-nowrap">
                      {r?.status_label ? r?.status_label : "-"}
                    </span>
                    {(() => {
                      const progressInfo = getProgressInfo(r);
                      return (
                        <div className="w-full">
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${progressInfo.color} transition-all duration-300 ease-out`}
                              style={{ width: `${progressInfo.percentage}%` }}
                            ></div>
                          </div>
                          <span
                            className={`text-xs mt-1 block ${progressInfo.textColor}`}
                          >
                            {progressInfo.percentage}%
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </td>
                <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                  {r?.entity_type_label}
                </td>
                <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                  {convertToPersianDate(r?.created_at)}
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center justify-start gap-2">
                    <button
                      onClick={() => handleDownload(r.id)}
                      title="دانلود"
                      className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/15"
                    >
                      <GrDocumentExcel width={20} height={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      title="حذف"
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15"
                    >
                      <MdDeleteOutline width={20} height={20} />
                    </button>
                    {r?.errors_count > 0  && <>
                    <button
                      onClick={() => handleErrors(r.id)}
                      title="خطا ها"
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15"
                    >
                      <BiErrorAlt width={20} height={20} />
                    </button>
                   
                    </>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ErrorModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        errors={errorsData}
      />
    </>
  );
}
