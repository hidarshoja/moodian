import {
  HomeIcon,
  UserIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { VscReport } from "react-icons/vsc";
import { PiChartScatter } from "react-icons/pi";
import { BiGitCompare } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineRateReview } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { ImConnection } from "react-icons/im";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import { MdOutlineSupportAgent } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { GiCheckedShield } from "react-icons/gi";
const userData = localStorage.getItem("USER");
const parsedUser = JSON.parse(userData);
const permissions = parsedUser?.roles?.[0]?.permissions;
console.log(permissions);
const permissionNames = parsedUser?.roles?.[0]?.permissions?.map((p) => p.name);
console.log(permissionNames);
const hasProductsView = permissionNames?.includes("product.view");
const hasCustomerView = permissionNames?.includes("customer.view");
const hasInvoiceView = permissionNames?.includes("invoice.view");

// Define all menu items with their required permissions
const allNavigationItems = [
  {
    name: "داشبورد",
    icon: <HomeIcon className="w-5 h-5 ml-2" />,
    href: "/",
    permission: null, // Always visible
  },
  {
    name: "پروفایل",
    icon: <UserIcon className="w-5 h-5 ml-2" />,
    href: "/profile",
    permission: null, // Always visible
  },
  {
    name: "کالا/خدمات",
    icon: <SiAmazonsimpleemailservice className="w-5 h-5 ml-2" />,
    href: "/services",
    permission: "product.view",
  },
  {
    name: "مشتری",
    icon: <UsersIcon className="w-5 h-5 ml-2" />,
    href: "/customers",
    permission: "customer.view",
  },
  {
    name: "فاکتور فروش",
    icon: <DocumentTextIcon className="w-5 h-5 ml-2" />,
    href: "/invoices",
    permission: "invoice.view",
  },
  {
    name: "قراردادهای پیمانکاری",
    icon: <DocumentTextIcon className="w-5 h-5 ml-2" />,
    href: "/contracts",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "گزارش ",
    icon: <VscReport className="w-5 h-5 ml-2" />,
    href: "/reports",
    permission: "invoice.view", // Add appropriate permission if needed
  },
  {
    name: "نمودارهای تحلیلی ",
    icon: <PiChartScatter className="w-5 h-5 ml-2" />,
    href: "/analyticalReports",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "مغایرت گیری",
    icon: <BiGitCompare className="w-5 h-5 ml-2" />,
    href: "/contradiction",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "خریدهای داخلی",
    icon: <CiShoppingCart className="w-5 h-5 ml-2" />,
    href: "/shopping",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "بررسی 169",
    icon: <MdOutlineRateReview className="w-5 h-5 ml-2" />,
    href: "/review",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "صورتحساب بانکی",
    icon: <RiBillLine className="w-5 h-5 ml-2" />,
    href: "/billBank",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "اتصالات بانکی ",
    icon: <ImConnection className="w-5 h-5 ml-2" />,
    href: "/connections",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "پشتیبانی",
    icon: <MdOutlineSupportAgent className="w-5 h-5 ml-2" />,
    href: "/support",
    permission: null, // Add appropriate permission if needed
  },
  {
    name: "کاربران",
    icon: <PiUsersThreeLight className="w-5 h-5 ml-2" />,
    href: "/users",
    permission: "user.view", // Add appropriate permission if needed
  },
  {
    name: "تنظیمات دسترسی",
    icon: <GiCheckedShield className="w-5 h-5 ml-2" />,
    href: "/roles",
    permission: "role.view", // Add appropriate permission if needed
  },
];

// Filter navigation based on user permissions
export const navigation = allNavigationItems.filter((item) => {
  // If no permission is required, always show the item
  if (!item.permission) {
    return true;
  }

  // Check if user has the required permission
  return permissionNames?.includes(item.permission);
});
