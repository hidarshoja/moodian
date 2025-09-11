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

export const navigation = [
  {
    name: "داشبورد",
    icon: <HomeIcon className="w-5 h-5 ml-2" />,
    href: "/",
  },
  {
    name: "پروفایل",
    icon: <UserIcon className="w-5 h-5 ml-2" />,
    href: "/profile",
  },
  {
    name: "کالا/خدمات",
    icon: <SiAmazonsimpleemailservice className="w-5 h-5 ml-2" />,
    href: "/services",
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
    name: "گزارش ",
    icon: <VscReport className="w-5 h-5 ml-2" />,
    href: "/reports",
  },
  {
    name: "نمودارهای تحلیلی ",
    icon: <PiChartScatter className="w-5 h-5 ml-2" />,
    href: "/analyticalReports",
  },
  {
    name: "مغایرت گیری",
    icon: <BiGitCompare className="w-5 h-5 ml-2" />,
    href: "/contradiction",
  },
  {
    name: "قراردادهای پیمانکاری",
    icon: <DocumentTextIcon className="w-5 h-5 ml-2" />,
    href: "/contracts",
  },
  {
    name: "خریدهای داخلی",
    icon: <CiShoppingCart className="w-5 h-5 ml-2" />,
    href: "/shopping",
  },
  {
    name: "بررسی 169",
    icon: <MdOutlineRateReview className="w-5 h-5 ml-2" />,
    href: "/review",
  },

  {
    name: "صورتحساب بانکی",
    icon: <RiBillLine className="w-5 h-5 ml-2" />,
    href: "/billBank",
  },
  {
    name: "اتصالات بانکی ",
    icon: <ImConnection className="w-5 h-5 ml-2" />,
    href: "/connections",
  },
];