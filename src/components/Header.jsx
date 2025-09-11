import React from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header({
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  return (
    <div className="header-panel sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4  border-b-2 border-[#3b466c] px-4 sm:gap-x-6 sm:px-6 lg:px-8 shadow-sm text-right font-sans">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-white lg:hidden hover:text-[#fdcb44] transition-colors duration-200"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">باز کردن منو</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      {!desktopSidebarOpen && (
        <button
          type="button"
          className="-m-2.5 p-2.5 text-white hidden lg:block hover:text-[#fdcb44] transition-colors duration-200"
          onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
      <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu
            as="div"
            className="flex flex-wrap items-center justify-end gap-1"
          >
            <div className="px-3 cursor-pointer flex overflow-hidden bg-white h-7 rounded-[11px] border border-[#5B7380] transition-all duration-300 hover:shadow-md">
              <div className="w-full flex items-center justify-center gap-1">
                <div>
                  <img
                    src="/img/zahra.svg"
                    className="w-[20px] h-[20px] rounded-[20px] border border-[#000]"
                    alt=""
                  />
                </div>
                <div className="text-color3 text-sm md:text-[16px]">
                  میلاد فاضلیان
                </div>
              </div>
            </div>
            <div className="w-[166px] flex overflow-hidden bg-[#FDCB44] h-7 rounded-[11px] border border-[#5B7380]">
              <div className="w-1/2 flex items-center justify-center gap-1 cursor-pointer hover:bg-black/10 transition-colors duration-200">
                <div>
                  <img
                    src="/img/userW.svg"
                    className="w-[17px] h-[17px]"
                    alt=""
                  />
                </div>
                <div className="text-white text-[12px]">
                  <Link to="/auth/login">ورود</Link>
                </div>
              </div>
              <div className="w-1/2 bg-[#5B7380] flex items-center justify-center gap-1 cursor-pointer border-r border-gray-500 hover:bg-black/10 transition-colors duration-200">
                <div className="text-white text-[12px]">خروج</div>
                <div>
                  <img
                    src="/img/exitW.svg"
                    className="w-[17px] h-[17px]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}
