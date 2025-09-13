import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axios from "axios";
import {
  CustomToastContainer,
  showSuccessToast,
  showErrorToast,
} from "./CustomToast";

const units = [
  "انتخاب ...",
  "عدد",
  "متر",
  "کیلوگرم",
  "گرم",
  "جعبه",
  "دست",
  "کارتن",
];

export default function ServicesTable() {
  const [dataTable, setDataTable] = useState([
    {
      code: "1234",
      name: "saeeid",
      unit: 3,
      valueAdded: "5555",
      otherTax: "6666",
      legalValue: "77777",
      legalRate: "8888",
      customCode: "9999",
    },
    {
      code: "4321",
      name: "Ali",
      unit: 5,
      valueAdded: "Ali123",
      otherTax: "ali666",
      legalValue: "ali77777",
      legalRate: "ali8888",
      customCode: "ali9999",
    },
  ]);

  // state برای مقدار فعلی inputها
  const [row, setRow] = useState({
    code: "",
    name: "",
    unit: "انتخاب ...",
    valueAdded: "",
    otherTax: "",
    legalValue: "",
    legalRate: "",
    customCode: "",
  });

  // sync کردن inputها با dataTable هنگام وارد کردن کد
  const handleCodeChange = (e) => {
    const code = e.target.value;
    setRow((prev) => ({ ...prev, code }));
    const found = dataTable.find((item) => item.code === code);
    if (found) {
      setRow({ ...found });
    } else {
      setRow((prev) => ({
        ...prev,
        name: "",
        unit: "انتخاب ...",
        valueAdded: "",
        otherTax: "",
        legalValue: "",
        legalRate: "",
        customCode: "",
      }));
    }
  };

  // ویرایش مقدار هر فیلد
  const handleFieldChange = (field, value) => {
    setRow((prev) => ({ ...prev, [field]: value }));
    // اگر کد وجود داشت، مقدار را در dataTable هم آپدیت کن
    setDataTable((prev) =>
      prev.map((item) =>
        item.code === row.code ? { ...item, [field]: value } : item
      )
    );
  };

  // حذف ردیف با کد فعلی
  const handleDelete = () => {
    setDataTable((prev) => prev.filter((item) => item.code !== row.code));
    setRow({
      code: "",
      name: "",
      unit: "انتخاب ...",
      valueAdded: "",
      otherTax: "",
      legalValue: "",
      legalRate: "",
      customCode: "",
    });
  };

  // ارسال داده به API تستی هنگام ویرایش
  const handleEdit = async () => {
    try {
      console.log("ارسال داده ویرایش:", row);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        row
      );
      showSuccessToast("ویرایش با موفقیت انجام شد!");
      console.log("پاسخ سرور:", response.data);
    } catch (error) {
      showErrorToast("خطا در ارسال داده!");
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 mt-8">
      <CustomToastContainer />
      <table className="min-w-full text-white">
        <thead>
          <tr className="text-white/80 text-xs bg-[#181f3a]">
            <th className="p-2">شناسه</th>
            <th className="p-2">نام</th>
            <th className="p-2">واحد</th>
            <th className="p-2">نرخ ارزش افزوده</th>
            <th className="p-2">مالیات و عوارض</th>
            <th className="p-2">نرخ سایر عوارض و مالیات</th>
            <th className="p-2">مقدار وجوه قانونی</th>
            <th className="p-2">نرخ سایر وجوه قانونی</th>
            <th className="p-2">کد کالا در سامانه مشتری</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white/10">
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.code}
                onChange={handleCodeChange}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <select
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.unit}
                onChange={(e) => handleFieldChange("unit", e.target.value)}
              >
                {units.map((u, idx) => (
                  <option
                    key={u}
                    value={idx}
                    className={u === "انتخاب ..." ? "text-red-500" : ""}
                  >
                    {u}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.valueAdded}
                onChange={(e) =>
                  handleFieldChange("valueAdded", e.target.value)
                }
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.otherTax}
                onChange={(e) => handleFieldChange("otherTax", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.legalValue}
                onChange={(e) =>
                  handleFieldChange("legalValue", e.target.value)
                }
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.legalRate}
                onChange={(e) => handleFieldChange("legalRate", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.customCode}
                onChange={(e) =>
                  handleFieldChange("customCode", e.target.value)
                }
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.customCode}
                onChange={(e) =>
                  handleFieldChange("customCode", e.target.value)
                }
              />
            </td>
            <td className="px-2 py-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 rounded hover:bg-red-500/20 text-red-500"
                  onClick={handleDelete}
                  disabled={
                    !row.code ||
                    !dataTable.find((item) => item.code === row.code)
                  }
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <button
                  className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                  onClick={handleEdit}
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
