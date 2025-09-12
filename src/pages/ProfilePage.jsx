import React, { useEffect, useMemo, useState } from "react";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    taxpayerName: "",
    taxMemoryName: "",
    taxMemoryCode: "",
    taxpayerEconomicCode: "",
    privateKey: "",
    address: "",
    postalCode: "",
    phone: "",
  });

  const isEditing = useMemo(() => editingIndex !== null, [editingIndex]);

  const openForCreate = () => {
    setEditingIndex(null);
    setForm({
      taxpayerName: "",
      taxMemoryName: "",
      taxMemoryCode: "",
      taxpayerEconomicCode: "",
      privateKey: "",
      address: "",
      postalCode: "",
      phone: "",
    });
    setIsOpen(true);
  };

  const openForEdit = (index) => {
    const rec = records[index];
    setEditingIndex(index);
    setForm({ ...rec });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setRecords((prev) =>
        prev.map((r, i) => (i === editingIndex ? { ...form } : r))
      );
    } else {
      setRecords((prev) => [{ ...form }, ...prev]);
    }
    setIsOpen(false);
  };

  const deleteRecord = (index) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  const copyPrivateKey = async (index) => {
    try {
      await navigator.clipboard.writeText(records[index]?.privateKey || "");
      // Optional: toast could be added later
    } catch (_) {
      // ignore
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/api/profile-records", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("failed");
        // const data = await res.json();
      } catch (_) {
        // ignore: فقط برای پیش‌نمایش UI از داده نمونه استفاده می‌کنیم
      }
      if (!isMounted) return;
      // سه درج پیاپی برای پیش‌نمایش جدول
      setRecords([
        {
          taxpayerName: "شرکت الف",
          taxMemoryName: "حافظه ۱",
          taxMemoryCode: "TM-1001",
          taxpayerEconomicCode: "EC-778899",
          privateKey: "-----BEGIN KEY-----AAA111...-----END KEY-----",
          address: "تهران، خیابان مثال، پلاک ۱۰",
          postalCode: "1234567890",
          phone: "021-12345678",
        },
      ]);
      setRecords((prev) => [
        ...prev,
        {
          taxpayerName: "شرکت ب",
          taxMemoryName: "حافظه ۲",
          taxMemoryCode: "TM-1002",
          taxpayerEconomicCode: "EC-112233",
          privateKey: "-----BEGIN KEY-----BBB222...-----END KEY-----",
          address: "مشهد، بلوار نمونه، کوچه ۵",
          postalCode: "9876543210",
          phone: "051-23456789",
        },
      ]);
      setRecords((prev) => [
        ...prev,
        {
          taxpayerName: "شرکت ج",
          taxMemoryName: "حافظه ۳",
          taxMemoryCode: "TM-1003",
          taxpayerEconomicCode: "EC-445566",
          privateKey: "-----BEGIN KEY-----CCC333...-----END KEY-----",
          address: "اصفهان، میدان نقش جهان، واحد ۱۲",
          postalCode: "4455667788",
          phone: "031-34567890",
        },
      ]);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold">پرفایل</h1>
              <p className="text-white/60 text-sm mt-1">
                نمای کلی اطلاعات کاربر
              </p>
            </div>
            <button
              onClick={openForCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 text-white border border-white/10 px-4 py-2 hover:bg-white/15 transition-colors"
            >
              <span className="text-sm">جدید +</span>
            </button>
          </div>
        </div>
      </div>
      <div className="users max-w-6xl mx-auto p-6">
        <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full">
            <thead>
              <tr className="text-white/80 text-sm bg-white/10">
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  نام مودی
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  نام حافظه مالیاتی
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  کد حافظه مالیاتی
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  کد اقتصادی مودی
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  کلید خصوصی
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">آدرس</th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  کد پستی
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">تلفن</th>
                <th className="text-center px-4 py-3 whitespace-nowrap">
                  اقدامات
                </th>
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
                    {r.taxpayerName}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r.taxMemoryName}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r.taxMemoryCode}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r.taxpayerEconomicCode}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                    {r.privateKey}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                    {r.address}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r.postalCode}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r.phone}
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => deleteRecord(i)}
                        title="حذف"
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M9 3a1 1 0 0 0-1 1v1H5.5a1 1 0 1 0 0 2H6v12a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm2 4a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V7Zm4 0a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V7Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openForEdit(i)}
                        title="ویرایش"
                        className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/15"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M18.375 2.625a3.182 3.182 0 0 1 4.5 4.5L8.81 21.19a3 3 0 0 1-1.27.75l-4.09 1.17a1 1 0 0 1-1.24-1.24l1.17-4.09a3 3 0 0 1 .75-1.27L18.375 2.625Zm-2.12 2.12-12.02 12.02a1 1 0 0 0-.25.42l-.65 2.28 2.28-.65a1 1 0 0 0 .42-.25l12.02-12.02-1.75-1.8Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => copyPrivateKey(i)}
                        title="کلید"
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/15"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M14.5 4a5.5 5.5 0 1 0 3.81 9.48l3.56 3.56a1 1 0 0 0 .71.3H24v-2h-1.09l-3.2-3.2A5.5 5.5 0 0 0 14.5 4Zm-3 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
          <div className="w-full max-w-2xl rounded-2xl bg-gray-900 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-white font-semibold">
                {isEditing ? "ویرایش اطلاعات" : "افزودن اطلاعات"}
              </h3>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block mb-1 text-white text-sm">
                  نام مودی
                </label>
                <input
                  name="taxpayerName"
                  value={form.taxpayerName}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block mb-1 text-white text-sm">
                  نام حافظه مالیاتی
                </label>
                <input
                  name="taxMemoryName"
                  value={form.taxMemoryName}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block mb-1 text-white text-sm">
                  کد حافظه مالیاتی
                </label>
                <input
                  name="taxMemoryCode"
                  value={form.taxMemoryCode}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block mb-1 text-white text-sm">
                  کد اقتصادی مودی
                </label>
                <input
                  name="taxpayerEconomicCode"
                  value={form.taxpayerEconomicCode}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-white text-sm">
                  کلید خصوصی
                </label>
                <input
                  name="privateKey"
                  value={form.privateKey}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-white text-sm">آدرس</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block mb-1 text-white text-sm">کد پستی</label>
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block mb-1 text-white text-sm">تلفن</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:bg-white/10"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500"
                >
                  {isEditing ? "بروزرسانی" : "ثبت"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
