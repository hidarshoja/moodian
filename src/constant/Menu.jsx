import { TbAirConditioning } from "react-icons/tb";
import { MdOutlineContentPaste } from "react-icons/md";
import { FaVolumeUp, FaDatabase, FaChartLine, FaBox, FaMapMarkerAlt, FaPlus, FaKey } from "react-icons/fa";

export const navigation = [
  { name: "شرط ها", href: "/", current: false, src: <TbAirConditioning /> },
  { name: "حجم ها", href: "/volume", current: false, src: <MdOutlineContentPaste /> },
  { name: "داده ها", href: "/data", current: false, src: <FaDatabase /> },
  { name: "نمودار ها", href: "/chart", current: false, src: <FaChartLine /> },
  { name: "ساخت باکس جدید", href: "/new-box", current: false, src: <FaBox /> },
  { name: "آدرس", href: "/address", current: false, src: <FaMapMarkerAlt /> },
  { name: "ایجاد", href: "/create", current: false, src: <FaPlus /> },
  { name: "رمز عبور", href: "/password", current: false, src: <FaKey /> },
];