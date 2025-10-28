import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../axios-client";
import {
  convertToPersianDate,
  extractTimeFromDate,
} from "../utils/change-date";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import DigitalSignatureModal from "../components/DigitalSignatureModal";
import DashboardCharts from "../components/DashboardCharts";

export default function DashboardPage() {
  const [error] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const user = useSelector((state) => state.user.value);
  const [activityUser, setActivityUser] = useState();
  const navigate = useNavigate();
  const userData = localStorage.getItem("USER");
const parsedUser = JSON.parse(userData);


  const openActivityModal = (user, activity) => {
    setSelectedUser(user);
    setSelectedActivity(activity);
    setIsActivityModalOpen(true);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedActivity(null);
    setSelectedUser(null);
  };

  const buildActivityDetails = (user, activity) => {
    let date = convertToPersianDate(activity.created_at);
    let time = extractTimeFromDate(activity.created_at);

    const fullName =
      `${user?.name ?? ""} ${user?.last_name ?? ""}`.trim() || "کاربر";
    const base = activity?.inp_label || "فعالیت";

    const items = [];
    if (activity) {
      items.push(
        `${fullName} در تاریخ ${date} ساعت ${time} عملیات «${base}» را انجام داد.`
      );
      items.push(`وضعیت: موفق`);
      items.push(`مرجع: ${activity?.inty_label}`);
    }
    return items;
  };

  // Removed unused profile fetch to satisfy linter: selected user reference wasn't used

  useEffect(() => {
   
      axiosClient
        .get("/invoices")
        .then((response) => {
          setActivityUser(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <div>
        <div className="w-full border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">داشبورد</h1>
            <p className="text-white/60 text-sm mt-1">
              نمای کلی اطلاعات کاربران
            </p>
          </div>

          <div>
            <button
              onClick={() => navigate("/create-token")}
              className="btn-custom"
            >
              ایجاد توکن
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center text-xl text-white mt-10">
          کاربر { parsedUser.name + " " + parsedUser.last_name }  به پنل مدیریت خود خوش آمدید!
        </div>
        
           <div className="p-6">
          <DashboardCharts />
           </div> 
        
      </div>
      
       
           <div className="users">
        {user === null && (
          <div className="p-8 text-white text-center">در حال بارگذاری...</div>
        )}
        {user && (
          <div className="mx-auto p-6 space-y-6">
            <div className="w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:-translate-y-[1px]">
              {error && (
                <div className="px-6 pt-6  text-xs text-amber-300">{error}</div>
              )}
              <div className="px-6 pt-6 pb-2 rounded-t-2xl bg-[#181f3a]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white font-bold text-xl">
                      کاربر #{user.id}
                    </h2>
                    <p className="text-white/60 text-sm mt-1">
                      شماره تماس: {user.mobile || "-"}
                    </p>
                  </div>
                  <div className="text-xs text-white/50 bg-white/10 rounded-full px-3 py-1 border border-white/10">
                    پروفایل
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                <div>
                  <label className="block mb-2 text-white text-sm">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${user?.name ?? ""} ${
                      user?.last_name ?? ""
                    }`.trim()}
                    className="w-full rounded-xl bg-gray-800/70 text-white/90 placeholder-white/40 border border-white/10 px-4 py-3 disabled:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-white text-sm">سمت</label>
                  <input
                    type="text"
                    disabled
                    value={
                      user?.roles?.map((role) => role.name).join(" - ") || ""
                    }
                    className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 disabled:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
                  />
                </div>
              </div>
              <div className="mt-6 px-6 pb-6">
                <div className="text-white font-semibold mb-3">آخرین فاکتورهای ارسالی </div>
                <ul className="space-y-2">
                  {activityUser?.length > 0 &&
                    [...activityUser].reverse().map((act) => (
                      <li
                        key={act.id}
                        className="flex items-center justify-between rounded-xl bg-gray-800/60 border border-white/10 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/70 text-xs border border-white/10">
                            {act.id}
                          </span>
                          <span className="text-white/90 text-sm">
                            {act?.inp_label}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => openActivityModal(user, act)}
                          className="btn-custom"
                        >
                          جزئیات
                        </button>
                      </li>
                    ))}
                  {activityUser?.length === 0 && (
                    <li className="text-white/60 text-sm">
                      فعالیتی ثبت نشده است.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
          </div>
      
    

      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
          <div className="w-full max-w-xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl overflow-hidden relative animate-slideIn">
            <div className="bg-[#0a0a22] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="font-semibold">جزئیات فعالیت</h3>
              <button
                onClick={closeActivityModal}
                className="text-white/80 hover:text-white "
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-6">
              <ul className="space-y-2 list-disc pr-6 text-white/90 text-sm">
                {buildActivityDetails(selectedUser, selectedActivity).map(
                  (t, idx) => (
                    <li key={idx}>{t}</li>
                  )
                )}
              </ul>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeActivityModal}
                  className="px-4 py-2 rounded-xl bg-[#0a0a22] text-white hover:bg-[#080819] transition-all"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={() => setIsSignatureModalOpen(true)}
        className="fixed left-3 bottom-3 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors"
      >
        <FaKey className="text-white" />
      </div>

      <DigitalSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSubmit={() => setIsSignatureModalOpen(false)}
      />
    </div>
  );
}
