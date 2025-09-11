import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { navigation } from "../constant/Menu";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";



export default function DesktopSidebar({
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
 
  return (
    <Transition.Root show={desktopSidebarOpen} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-500 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-500 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="header-panel hidden lg:w-1/5 lg:flex lg:flex-col  lg:overflow-y-auto lg:px-4 lg:pb-4 lg:h-screen border-l-2 border-gray-200 shadow-lg text-right font-sans scrollbar-hide">
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
              {navigation?.map((item) => (
               <li key={item.name} className=" sidebar-shutter w-full border-2 border-gray-700 rounded-lg">
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
              ))}
            </ul>
          </nav>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}
