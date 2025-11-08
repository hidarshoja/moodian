import React, { useState } from "react";

export default function InvoiceDetailsModal({ isOpen, onClose, data }) {
  // managa expansion/accordion state for each invoice row
  const [openRow, setOpenRow] = useState(null);

  if (!isOpen || !data) return null;
  // sample table, customize columns as needed
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-6xl bg-[#23234a] p-6 rounded-2xl border border-white/10">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="text-white text-lg font-bold">ریز فاکتور فروش ها</div>
          <button onClick={onClose} className="text-white">×</button>
        </div>
        <table className="w-full ">
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
                <tr className="text-white border-t p-2 border-white/10 odd:bg-white/5 even:bg-white/10">
                  <td className="text-center p-2">{row?.taxid}</td>
                  <td className="text-center p-2">{row?.status_label}</td>
                  <td className="text-center p-2">{row?.inp_label}</td>
                  <td className="text-center p-2">{row?.customer?.name} - {row?.customer?.last_name}</td>
                  <td className="text-center p-2">{Number(row?.tadis).toLocaleString("fa-IR")}</td>
                  <td>
                    <button onClick={() => setOpenRow(openRow === i ? null : i)}>
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
                          </tr>
                        </thead>
                        <tbody>
                           {row.items?.map((item, idx) => (
                              <tr key={idx} className="text-white border-t p-2 border-white/10 bg-white/5">
                                 <td className="text-center p-2">{item?.product?.title}</td>
                                 <td className="text-center p-2">
                                  {Number(item?.am).toLocaleString("fa-IR")}
                                  /{Number(item?.fee).toLocaleString("fa-IR")}
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
        <button onClick={onClose} className="btn-custom6 text-center w-full mt-4">انصراف</button>
      </div>
    </div>
  );
}