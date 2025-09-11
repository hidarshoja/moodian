import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "داشبورد",
    icon: <HomeIcon className="w-5 h-5 ml-2" />,
    href: "/dashboard",
  },
  {
    name: "پروفایل",
    icon: <UserIcon className="w-5 h-5 ml-2" />,
    href: "/profile",
  },
  {
    name: "کالا/خدمات",
    icon: <ShoppingBagIcon className="w-5 h-5 ml-2" />,
    href: "/products",
  },
  {
    name: "مشتری",
    icon: <UsersIcon className="w-5 h-5 ml-2" />,
    href: "/customers",
  },
  {
    name: "فاکتور فروش",
    icon: <DocumentTextIcon className="w-5 h-5 ml-2" />,
    href: "/invoices",
  },
  {
    name: "قراردادهای پیمانکاری",
    icon: <DocumentTextIcon className="w-5 h-5 ml-2" />,
    href: "/contracts",
  },
  {
    name: "گزارش مرور تجربه",
    icon: <ChartBarIcon className="w-5 h-5 ml-2" />,
    href: "/reports",
  },
  {
    name: "مغایرت گیری",
    icon: <ExclamationCircleIcon className="w-5 h-5 ml-2" />,
    href: "/reconciliation",
  },
  {
    name: "پشتیبانی و مشاوره مالیاتی",
    icon: <ExclamationCircleIcon className="w-5 h-5 ml-2" />,
    href: "/support",
  },
  {
    name: "پرداخت آنلاین",
    icon: <CreditCardIcon className="w-5 h-5 ml-2" />,
    href: "/payment",
  },
];

export default function DesktopSidebar({
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  const location = useLocation();
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
        <div className="hidden lg:w-1/5 lg:flex lg:flex-col bg-gradient-to-tr from-[#3b466c] to-[#6bb7b7] lg:overflow-y-auto lg:px-4 lg:pb-4 lg:h-screen border-l-2 border-gray-200 shadow-lg text-right font-sans scrollbar-hide">
          <div className="flex items-center justify-between mt-6 mb-8">
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
            <ul className="flex flex-1 flex-col gap-y-4 mt-4">
              {menuItems.map((item) => (
               <li key={item.name} className=" sidebar-shutter w-full border-2 border-gray-700 rounded-lg">
               <Link
                 to={item.href}
                 className=" flex items-center justify-start w-full  px-3 py-1 text-base font-bold"
                 style={{ color: "white" }}
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
