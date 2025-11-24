import React, { useState } from "react";

export default function InvoiceDetailsModal({ isOpen, onClose, data }) {
  // managa expansion/accordion state for each invoice row
  const [openRow, setOpenRow] = useState(null);

  // map status code to a tailwind text color class
  const getTextColorByStatus = (status) => {
    if (status === 100) return "text-green-400";
    if (status === 0) return "text-white";
    if (status === 10 || status === 20) return "text-orange-400";
    if (status === -80 || status === -90 || status === -10)
      return "text-red-400";
    return "text-white";
  };

  if (!isOpen || !data) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-6xl bg-[#23234a] rounded-2xl border border-white/10 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 p-6 pb-4 flex-shrink-0">
          <div className="text-white text-lg font-bold">ریز فاکتور فروش ها</div>
          <button onClick={onClose} className="text-white">
            ×
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 min-h-0">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-white bg-[#161636]">
                  {/* Your columns */}
                  <th className="py-4">TaxId</th>
                  <th>وضعیت</th>
                  <th>موضوع</th>
                  <th>مشتری</th>
                  <th>مبلغ کل</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.data?.map((row, i) => (
                  <React.Fragment key={i}>
                    <tr
                      className={`${getTextColorByStatus(
                        row?.status
                      )} border-t p-2 border-white/10 odd:bg-white/5 even:bg-white/10`}
                    >
                      <td className="text-center p-2">{row?.taxid}</td>
                      <td className="text-center p-2">{row?.status_label}</td>
                      <td className="text-center p-2">{row?.inp_label}</td>
                      <td className="text-center p-2">
                        {row?.customer?.name} - {row?.customer?.last_name}
                      </td>
                      <td className="text-center p-2">
                        {Number(row?.tadis).toLocaleString("fa-IR")}
                      </td>
                      <td>
                        <button
                          onClick={() => setOpenRow(openRow === i ? null : i)}
                        >
                          {openRow === i ? "−" : "+"}
                        </button>
                      </td>
                    </tr>
                    {/* فضای جدول زیرین (expansion row) برای ردیف‌های فاکتور */}
                    {openRow === i && (
                      <tr>
                        <td colSpan={6}>
                          {/* جدول ردیف‌ها/جزئیات هر فاکتور */}
                          <table className="w-full border mt-2">
                            <thead>
                              <tr className="text-white bg-[#161636]">
                                <th className="py-4">نام کالا/خدمت</th>
                                <th className="py-4">مقدار / تعداد</th>
                                <th className="py-4">مبلغ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.items?.map((item, idx) => (
                                <tr
                                  key={idx}
                                  className="text-white border-t p-2 border-white/10 bg-white/5"
                                >
                                  <td className="text-center p-2">
                                    {item?.product?.title}
                                  </td>
                                  <td className="text-center p-2">
                                    {Number(item?.am).toLocaleString("fa-IR")}
                                  </td>
                                  <td className="text-center p-2">
                                    {Number(item?.fee).toLocaleString("fa-IR")}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="md:hidden space-y-3">
            {data.data?.map((row, i) => (
              <div
                key={i}
                className={`${
                  i % 2 === 0
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-gray-500 hover:bg-gray-600"
                } rounded-lg p-4 text-white transition-colors`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">TaxId:</span>
                    <span
                      className={`text-sm font-medium ${getTextColorByStatus(
                        row?.status
                      )}`}
                    >
                      {row?.taxid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">وضعیت:</span>
                    <span
                      className={`text-sm font-medium ${getTextColorByStatus(
                        row?.status
                      )}`}
                    >
                      {row?.status_label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">موضوع:</span>
                    <span
                      className={`text-sm font-medium ${getTextColorByStatus(
                        row?.status
                      )}`}
                    >
                      {row?.inp_label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">مشتری:</span>
                    <span
                      className={`text-sm font-medium ${getTextColorByStatus(
                        row?.status
                      )}`}
                    >
                      {row?.customer?.name} - {row?.customer?.last_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">مبلغ کل:</span>
                    <span
                      className={`text-sm font-medium ${getTextColorByStatus(
                        row?.status
                      )}`}
                    >
                      {Number(row?.tadis).toLocaleString("fa-IR")}
                    </span>
                  </div>
                  <div className="flex items-center justify-center pt-2">
                    <button
                      onClick={() => setOpenRow(openRow === i ? null : i)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {openRow === i ? "بستن جزئیات −" : "مشاهده جزئیات +"}
                    </button>
                  </div>
                </div>

                {/* Mobile Expansion - Items List */}
                {openRow === i && row.items && row.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-sm font-medium mb-3 text-white/80">
                      جزئیات اقلام:
                    </div>
                    <div className="space-y-2">
                      {row.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 rounded p-3 border border-white/10"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-white/70">
                              نام کالا/خدمت:
                            </span>
                            <span className="text-sm font-medium text-white">
                              {item?.product?.title}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-white/70">
                              مقدار / تعداد:
                            </span>
                            <span className="text-sm font-medium text-white">
                              {Number(item?.am).toLocaleString("fa-IR")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white/70">مبلغ:</span>
                            <span className="text-sm font-medium text-white">
                              {Number(item?.fee).toLocaleString("fa-IR")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 pt-4 flex-shrink-0">
          <button onClick={onClose} className="btn-custom6 text-center w-full">
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
