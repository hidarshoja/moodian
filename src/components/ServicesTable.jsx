import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

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
  const [filters, setFilters] = useState({
    code: "",
    name: "",
    unit: "انتخاب ...",
    valueAdded: "",
    otherTax: "",
    legalValue: "",
    legalRate: "",
    customCode: "",
  });

  // داده‌های نمونه (خالی)
  const data = [];

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 mt-8">
      <table className="min-w-full">
        <thead>
          <tr className="text-white/80 text-xs bg-[#181f3a]">
            <th className="px-2 py-2">شناسه</th>
            <th className="px-2 py-2">نام</th>
            <th className="px-2 py-2">واحد</th>
            <th className="px-2 py-2">نرخ ارزش افزوده</th>
            <th className="px-2 py-2">مالیات و عوارض</th>
            <th className="px-2 py-2">نرخ سایر عوارض و مالیات</th>
            <th className="px-2 py-2">مقدار وجوه قانونی</th>
            <th className="px-2 py-2">نرخ سایر وجوه قانونی</th>
            <th className="px-2 py-2">کد کالا در سامانه مشتری</th>
            <th className="px-2 py-2">عملیات</th>
          </tr>
          <tr className="bg-white/10">
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.code}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, code: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.name}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, name: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1">
              <select
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.unit}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, unit: e.target.value }))
                }
              >
                {units.map((u) => (
                  <option
                    key={u}
                    value={u}
                    className={u === "انتخاب ..." ? "text-red-500" : ""}
                  >
                    {u}
                  </option>
                ))}
              </select>
            </th>
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.valueAdded}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, valueAdded: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.otherTax}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, otherTax: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.legalValue}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, legalValue: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.legalRate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, legalRate: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.customCode}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, customCode: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={filters.customCode}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, customCode: e.target.value }))
                }
              />
            </th>
            <th className="px-2 py-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <button className="p-1 rounded hover:bg-red-500/20 text-red-500">
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-blue-500/20 text-blue-500">
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={10}
                className="text-center text-xs text-white/70 py-6"
              >
                (موردی وجود ندارد)
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
