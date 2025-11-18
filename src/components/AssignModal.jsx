import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import PropTypes from "prop-types";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import { convertToPersianDate } from "../utils/change-date";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function AssignModal({
  transaction,
  onClose,
  loading3,
  meta,
  setPageCount2,
  pageCount2,
  setLoading3,
  idActive,
  activeAccount,
  refresh,
  setRefresh,
}) {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [activeAccountIds, setActiveAccountIds] = useState([]);
  const [activeAccountAmountMap, setActiveAccountAmountMap] = useState({});
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (activeAccount && activeAccount.length > 0) {
      const activeIds = activeAccount.map((acc) => acc.id);
      setSelectedTransactions(activeIds);
      setActiveAccountIds(activeIds);
      // ایجاد Map از id به invoice_transaction_pivot.amount
      const amountMap = {};
      const initialValues = {};
      activeAccount.forEach((acc) => {
        if (acc.id && acc.invoice_transaction_pivot?.amount !== undefined) {
          amountMap[acc.id] = acc.invoice_transaction_pivot.amount;
          initialValues[acc.id] = acc.invoice_transaction_pivot.amount;
        }
      });
      setActiveAccountAmountMap(amountMap);
      setInputValues((prev) => ({ ...prev, ...initialValues }));
    }
  }, [activeAccount]);

  // مقداردهی اولیه input ها بر اساس transaction
  useEffect(() => {
    if (transaction && transaction.length > 0) {
      const initialValues = {};
      transaction.forEach((t) => {
        if (t.id) {
          if (activeAccountIds.includes(t.id)) {
            initialValues[t.id] = activeAccountAmountMap[t.id] || 0;
          } else {
            initialValues[t.id] =
              t?.amount - (t?.sum_invoices_assigned_amount || 0);
          }
        }
      });
      setInputValues((prev) => {
        // فقط مقادیری که قبلا تنظیم نشده‌اند را اضافه کنیم
        const newValues = { ...prev };
        Object.keys(initialValues).forEach((id) => {
          if (newValues[id] === undefined) {
            newValues[id] = initialValues[id];
          }
        });
        return newValues;
      });
    }
  }, [transaction, activeAccountIds, activeAccountAmountMap]);

  const handleCheckboxChange = (id) => {
    setSelectedTransactions((prev) => {
      if (prev.includes(id)) {
        // اگر checkbox untick شد، مقدار را به مقدار پیش‌فرض برگردان
        const currentTransaction = transaction?.find((t) => t.id === id);
        if (currentTransaction) {
          setInputValues((prevValues) => ({
            ...prevValues,
            [id]:
              currentTransaction?.amount -
              (currentTransaction?.sum_invoices_assigned_amount || 0),
          }));
        }
        return prev.filter((item) => item !== id);
      } else {
        // اگر checkbox tick شد، مقدار را از activeAccount بگیر یا مقدار پیش‌فرض
        const currentTransaction = transaction?.find((t) => t.id === id);
        if (currentTransaction) {
          const newValue =
            activeAccountAmountMap[id] ||
            currentTransaction?.amount -
              (currentTransaction?.sum_invoices_assigned_amount || 0);
          setInputValues((prevValues) => ({
            ...prevValues,
            [id]: newValue,
          }));
        }
        return [...prev, id];
      }
    });
  };

  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleShowAssign = () => {
    // ساخت آرایه از objectها با id و amount
    const transactions = selectedTransactions.map((id) => ({
      id: id,
      amount: inputValues[id] ?? 0,
    }));

    axiosClient
      .post(`/invoices/${idActive}/assign-transactions`, { transactions })
      .then((response) => {
        console.log(`response`, response);
        setRefresh(!refresh);
        Swal.fire({
          icon: "success",
          title: "موفقیت آمیز",
          text: "عملیات با موفقیت انجام شد",
        });
        onClose();
      })
      .catch((err) => {
        console.error("Error assigning transactions:", err);
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "عملیات با خطا مواجه شد",
        });
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
      <div
        className="w-full max-w-5xl flex flex-col rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-white text-lg font-bold">اساین1 فاکتور</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            X
          </button>
        </div>
        <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 p-3  relative">
          {loading3 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
              <Spinner />
            </div>
          )}
          <table
            className={`min-w-full text-white ${
              loading3 ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            <thead>
              <tr className="text-white/80 text-sm bg-[#181f3a]">
                <th className="text-right px-4 py-3 whitespace-nowrap">#</th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  شماره
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  مقدار
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  تاریخ تراکنش{" "}
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  کد پیگیری{" "}
                </th>
                <th className="text-right px-4 py-3 whitespace-nowrap">
                  {" "}
                  بانک{" "}
                </th>
                <th className="text-center px-4 py-3 whitespace-nowrap">
                  وضعیت
                </th>
                <th className="text-center px-4 py-3 whitespace-nowrap">
                  مبلغ{" "}
                </th>
                <th className="text-center px-4 py-3 whitespace-nowrap">
                  {" "}
                  مبلغ باقیمانده{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {(!transaction || transaction.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-white/60 text-sm"
                  >
                    موردی ثبت نشده است.
                  </td>
                </tr>
              )}
              {transaction.map((r, i) => (
                <tr
                  key={r.id ?? i}
                  className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
                >
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(r.id)}
                      onChange={() => handleCheckboxChange(r.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r?.id}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    <input
                      type="text"
                      value={
                        inputValues[r.id] ??
                        (activeAccountIds.includes(r.id)
                          ? activeAccountAmountMap[r.id] || 0
                          : r?.amount - (r?.sum_invoices_assigned_amount || 0))
                      }
                      onChange={(e) => handleInputChange(r.id, e.target.value)}
                      disabled={!selectedTransactions.includes(r.id)}
                      className={`w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-sm ${
                        selectedTransactions.includes(r.id)
                          ? "text-white/90 cursor-text"
                          : "text-white/40 cursor-not-allowed opacity-50"
                      }`}
                    />
                  </td>

                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                  {convertToPersianDate(r?.indatim)}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r?.tracking_code}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r?.bank_label}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {r?.status_label}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                    {new Intl.NumberFormat("fa-IR").format(r?.amount)}
                  </td>
                  <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap text-center">
                    {new Intl.NumberFormat("fa-IR").format(
                      r?.amount - r?.sum_invoices_assigned_amount
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex items-center justify-end">
            <div className="flex items-center  gap-2 w-full">
              <div className="w-2/5"></div>
              <div className="w-1/5 flex items-center justify-center ">
                <Pagination
                  meta={meta}
                  pageCount={pageCount2}
                  setPageCount={setPageCount2}
                  setLoading={setLoading3}
                />
              </div>
              <div className="w-1/5"></div>
              <div className="w-1/5 flex items-center justify-end">
                <button
                  onClick={handleShowAssign}
                  className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-red-500/20 hover:bg-red-500/15"
                >
                  ذخیره کردن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AssignModal.propTypes = {
  transaction: PropTypes.array,
  loading3: PropTypes.bool,
  onClose: PropTypes.func,
  meta: PropTypes.object,
  pageCount2: PropTypes.number,
  setPageCount2: PropTypes.func,
  setLoading3: PropTypes.func,
  idActive: PropTypes.number,
  activeAccount: PropTypes.array,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};
