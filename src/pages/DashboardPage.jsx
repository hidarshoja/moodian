import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        // نمونه درخواست به یک API (آدرس دلخواه/جایگزین)
        const response = await fetch("/api/users", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        if (!isMounted) return;
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        // در صورت خطا، با داده‌های نمونه ادامه می‌دهیم
        if (!isMounted) return;

        setUsers([
          {
            id: 1,
            name: "حیدر",
            lastName: "شجاع",
            phone: "09376228320",
            side: "کاربر",
            Activities: [
              { id: 1, name: "خرید طلا" },
              { id: 2, name: "فروش طلا" },
              { id: 3, name: "خرید رمز ارز" },
              { id: 4, name: "طلای آب شده" },
            ],
          },
        ]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">داشبورد</h1>
          <p className="text-white/60 text-sm mt-1">نمای کلی اطلاعات کاربران</p>
        </div>
      </div>
      <div className="users">
        {isLoading && (
          <div className="p-8 text-white text-center">در حال بارگذاری...</div>
        )}
        {!isLoading && (
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {users.map((u) => (
              <div
                key={u.id}
                className="w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:-translate-y-[1px]"
              >
                {error && (
                  <div className="px-6 pt-6 text-xs text-amber-300">
                    {error}
                  </div>
                )}
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-white font-bold text-xl">
                        کاربر #{u.id}
                      </h2>
                      <p className="text-white/60 text-sm mt-1">
                        شماره تماس: {u.phone || "-"}
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
                      value={`${u?.name ?? ""} ${u?.lastName ?? ""}`.trim()}
                      className="w-full rounded-xl bg-gray-800/70 text-white/90 placeholder-white/40 border border-white/10 px-4 py-3 disabled:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white text-sm">سمت</label>
                    <input
                      type="text"
                      disabled
                      value={u?.side ?? ""}
                      className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 disabled:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
                    />
                  </div>
                </div>
                <div className="mt-6 px-6 pb-6">
                  <div className="text-white font-semibold mb-3">فعالیت‌ها</div>
                  <ul className="space-y-2">
                    {(u?.Activities || []).map((act) => (
                      <li
                        key={act.id}
                        className="flex items-center justify-between rounded-xl bg-gray-800/60 border border-white/10 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/70 text-xs border border-white/10">
                            {act.id}
                          </span>
                          <span className="text-white/90 text-sm">
                            {act.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-white/50">
                          جزئیات
                        </span>
                      </li>
                    ))}
                    {(!u?.Activities || u.Activities.length === 0) && (
                      <li className="text-white/60 text-sm">
                        فعالیتی ثبت نشده است.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
