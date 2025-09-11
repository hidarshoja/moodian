import {
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

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