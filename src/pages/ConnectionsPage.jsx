import { useState } from "react";
import { FaCreditCard, FaShoppingCart } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState("economic");

  // Economic tab states
  const [economicStartDate, setEconomicStartDate] = useState(
    new Date("2025-09-15")
  );
  const [economicEndDate, setEconomicEndDate] = useState(
    new Date("2026-09-14")
  );
  const [economicDiscount, setEconomicDiscount] = useState(0);
  const [economicVAT, setEconomicVAT] = useState(2000000);
  const [economicTotal, setEconomicTotal] = useState(22000000);

  // Buy/Renew tab states
  const [buyStartDate, setBuyStartDate] = useState(new Date("2025-10-11"));
  const [buyEndDate, setBuyEndDate] = useState(new Date("2026-10-10"));
  const [purchasePeriod, setPurchasePeriod] = useState("یکساله");
  const [taxMemoryCount, setTaxMemoryCount] = useState(1);
  const [userCount, setUserCount] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [buyDiscount, setBuyDiscount] = useState(0);
  const [buyVAT, setBuyVAT] = useState(6200000);
  const [buyTotal, setBuyTotal] = useState(68200000);

  const purchasePeriodOptions = ["یکساله", "6 ماهه", "3 ماهه", "1 ماهه"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">اشتراک</h1>
          <p className="text-white/60 text-sm mt-1">
            مدیریت اشتراک و اتصالات بانکی
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <div className="flex gap-5 space-x-1 bg-gray-800 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab("economic")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
              activeTab === "economic"
                ? "bg-teal-500 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            <FaCreditCard className="w-5 h-5" />
            اقتصادی
          </button>
          <button
            onClick={() => setActiveTab("buy")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
              activeTab === "buy"
                ? "bg-teal-500 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            <FaShoppingCart className="w-5 h-5" />
            خرید/تمدید
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "economic" && (
          <div className="w-full mx-auto bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  تاریخ شروع
                </label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={economicStartDate}
                  onChange={setEconomicStartDate}
                  calendarPosition="bottom-right"
                  inputClass="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  تاریخ پایان
                </label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={economicEndDate}
                  onChange={setEconomicEndDate}
                  calendarPosition="bottom-right"
                  inputClass="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* Discount Amount */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  مبلغ تخفیف
                </label>
                <input
                  type="number"
                  value={economicDiscount}
                  onChange={(e) => setEconomicDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* VAT Amount */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  مبلغ ارزش افزوده
                </label>
                <input
                  type="number"
                  value={economicVAT}
                  onChange={(e) => setEconomicVAT(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* Total Amount */}
              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  مبلغ پرداختی برای یکسال 20 فاکتور فروش
                </label>
                <input
                  type="number"
                  value={economicTotal}
                  onChange={(e) => setEconomicTotal(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
                انصراف
              </button>
              <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md transition-colors ring-2 ring-teal-400 ring-opacity-50">
                پرداخت
              </button>
            </div>
          </div>
        )}

        {activeTab === "buy" && (
          <div className="w-full mx-auto bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Start Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  تاریخ شروع
                </label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={buyStartDate}
                  onChange={setBuyStartDate}
                  calendarPosition="bottom-right"
                  inputClass="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* Purchase Period */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  بازه خرید
                </label>
                <div className="relative">
                  <select
                    value={purchasePeriod}
                    onChange={(e) => setPurchasePeriod(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right appearance-none"
                  >
                    {purchasePeriodOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  تاریخ پایان
                </label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={buyEndDate}
                  onChange={setBuyEndDate}
                  calendarPosition="bottom-right"
                  inputClass="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* Tax Memory Count */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  تعداد حافظه مالیاتی
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      setTaxMemoryCount(Math.max(1, taxMemoryCount - 1))
                    }
                    className="p-2 bg-gray-700 border border-gray-600 rounded-l-md hover:bg-gray-600 text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={taxMemoryCount}
                    onChange={(e) => setTaxMemoryCount(Number(e.target.value))}
                    className="flex-1 px-3 py-2 bg-gray-700 border-t border-b border-gray-600 text-white text-center focus:outline-none"
                  />
                  <button
                    onClick={() => setTaxMemoryCount(taxMemoryCount + 1)}
                    className="p-2 bg-gray-700 border border-gray-600 rounded-r-md hover:bg-gray-600 text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* User Count */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  تعداد کاربر
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setUserCount(Math.max(1, userCount - 1))}
                    className="p-2 bg-gray-700 border border-gray-600 rounded-l-md hover:bg-gray-600 text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={userCount}
                    onChange={(e) => setUserCount(Number(e.target.value))}
                    className="flex-1 px-3 py-2 bg-gray-700 border-t border-b border-gray-600 text-white text-center focus:outline-none"
                  />
                  <button
                    onClick={() => setUserCount(userCount + 1)}
                    className="p-2 bg-gray-700 border border-gray-600 rounded-r-md hover:bg-gray-600 text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Empty div for spacing */}
              <div></div>

              {/* Discount Code */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  کد تخفیف
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="کد تخفیف را وارد کنید"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                  />
                  <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-l-md hover:bg-red-700 transition-colors">
                    اعمال
                  </button>
                </div>
              </div>

              {/* Discount Amount */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  مبلغ تخفیف
                </label>
                <input
                  type="number"
                  value={buyDiscount}
                  onChange={(e) => setBuyDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* Empty div for spacing */}
              <div></div>

              {/* VAT Amount */}
              <div className="md:col-span-3">
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  مبلغ ارزش افزوده
                </label>
                <input
                  type="number"
                  value={buyVAT}
                  onChange={(e) => setBuyVAT(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>

              {/* Total Amount */}
              <div className="md:col-span-3">
                <label className="block text-white text-sm font-medium mb-2 text-right">
                  مبلغ پرداختی برای 12 ماه
                </label>
                <input
                  type="number"
                  value={buyTotal}
                  onChange={(e) => setBuyTotal(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-right placeholder-gray-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
                انصراف
              </button>
              <button className="flex-1 bg-gray-700 border-2 border-gray-500 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-600 transition-colors">
                پیش فاکتور فروش
              </button>
              <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md transition-colors ring-2 ring-teal-400 ring-opacity-50">
                پرداخت
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
