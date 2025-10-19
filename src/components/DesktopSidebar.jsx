import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { navigation } from "../constant/Menu";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import LogoDescriptionModal from "./LogoDescriptionModal";
import PropTypes from "prop-types";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";

export default function DesktopSidebar({
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  const location = useLocation();
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleLogoClick = () => {
    setIsLogoModalOpen(true);
  };

  const checkMoadian = async () => {
    try {
      const response = await axiosClient.get("/moadian/fiscal-info");
      console.log(response.data.data);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success", // یا 'error'
        title: "ارتباط برقرار است.",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      setIsSuccess(true);
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error", // یا 'error'
        title: "خطا در برقرای ارتباط",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      setIsSuccess(false);
    }
  };

  return (
    <>
      <Transition.Root show={desktopSidebarOpen} as={Fragment}>
        <Transition.Child
          as="div"
          enter="transition ease-in-out duration-500 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="header-panel hidden lg:w-1/5 lg:flex lg:flex-col  lg:overflow-y-auto lg:px-4 lg:pb-4 lg:h-screen border-l-2 border-gray-200 shadow-lg text-right font-sans scrollbar-hide"
        >
          <div className="flex items-center justify-between mt-4 mb-4">
            <div className="flex h-16 items-center">
              <img src="/img/ice-logo.svg" alt="logo" className="w-24" />
            </div>
            <button
              type="button"
              className="mr-4"
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
            >
              <span className="sr-only">بستن منو</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2 mt-4">
              <span
                onClick={handleLogoClick}
                className="text-white cursor-pointer text-sm hover:text-orange-300 mb-3"
              >
                درج لوگو و توضیحات
              </span>
              {navigation?.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li
                    key={item.name}
                    //  className=" sidebar-shutter w-full border-2 border-gray-700 rounded-lg"
                    className={` w-full border-2 border-gray-700 rounded-lg ${
                      isActive ? "sidebar-shutter-active" : "sidebar-shutter"
                    }`}
                  >
                    <Link
                      to={item.href}
                      className=" flex items-center justify-start w-full  px-3 py-1 text-sm text-white"
                    >
                      <span className="sidebar-shutter-content">
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Transition.Child>
      </Transition.Root>

      {/* Logo Description Modal */}
      <LogoDescriptionModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
      <div className="fixed bottom-9 right-5 w-60 flex items-center text-sm rounded-md cursor-pointer justify-center py-2 text-white border border-green-500 hover:bg-green-600 hover:text-white"
      onClick={checkMoadian}
      >
       {isSuccess ?"ارتباط بر قرار است" : "چک ارتباط با سامانه مودیان" } 
      </div>
    </>
  );
}

DesktopSidebar.propTypes = {
  desktopSidebarOpen: PropTypes.bool.isRequired,
  setDesktopSidebarOpen: PropTypes.func.isRequired,
};
