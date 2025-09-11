import React from "react";
import { useSelector } from "react-redux";

export default function ChartPage() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className="theme-transition">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">
          داشبورد ارز دیجیتال
        </h1>
        <p className="text-gray-600 dark:text-dark-text-secondary">
          مدیریت و تحلیل ارزهای دیجیتال شما
        </p>
      </div>

      {/* Sample Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border crypto-glow theme-transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                بیت کوین
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-dark-accent">
                $45,230
              </p>
              <p className="text-sm text-green-500 dark:text-dark-success">
                +2.5%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">₿</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border crypto-glow theme-transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                اتریوم
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-dark-accent">
                $3,120
              </p>
              <p className="text-sm text-green-500 dark:text-dark-success">
                +1.8%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">Ξ</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border crypto-glow theme-transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                سولانا
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-dark-accent">
                $98.50
              </p>
              <p className="text-sm text-red-500 dark:text-dark-danger">
                -0.5%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">◎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Chart Area */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border theme-transition">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">
          نمودار قیمت ارزها
        </h2>
        <div className="h-64 bg-gray-50 dark:bg-dark-bg rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-dark-text-secondary">
            نمودار قیمت در اینجا نمایش داده می‌شود
          </p>
        </div>
      </div>

      {/* Theme Status */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-dark-card dark:to-dark-card rounded-lg border border-gray-200 dark:border-dark-border theme-transition">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-dark-text">
              حالت فعلی: {isDarkMode ? "تاریک" : "روشن"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              برای تغییر حالت از دکمه بالا استفاده کنید
            </p>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              isDarkMode ? "bg-dark-accent" : "bg-yellow-400"
            } animate-pulse-slow`}
          ></div>
        </div>
      </div>
    </div>
  );
}
