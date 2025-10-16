import { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AddLineItemModal from "./AddLineItemModal";
import PropTypes from "prop-types";
import { SlPrinter } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

export default function CreateModalInvoices({ isOpen2, onClose2 }) {
  const [invoiceData, setInvoiceData] = useState({
    inty: "1",
    inp: "",
    indatim: new Date(),
    indati2m: new Date(),
    comment: "",
    crn: "",
    bbc: "",
    setm: "نقدی",
    MyInvoiceId: "",
    sbc: "",
  });
  const [lineItems, setLineItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [totals, setTotals] = useState({
    tprdis: 0,
    tdis: 0,
    tadis: 0,
    cap: 0,
    insp: 0,
    tvam: 0,
    todam: 0,
    tbill: 0,
  });

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Recalculate derived totals whenever line items change
  useEffect(() => {
    const calculatedTotals = lineItems.reduce(
      (acc, item) => {
        acc.tprdis += item.am * item.fee || 0;
        acc.tdis += item.prdis || 0;
        acc.tdis += item.dis || 0;
        acc.tadis += item.adis || 0;
        return acc;
      },
      {
        tprdis: 0,
        tdis: 0,
        tadis: 0,
        cap: totals.cap || 0,
        insp: totals.insp || 0,
        tvam: totals.tvam || 0,
        todam: totals.todam || 0,
        tbill: 0,
      }
    );

    calculatedTotals.tbill =
      calculatedTotals.tadis +
      calculatedTotals.tvam +
      calculatedTotals.todam;

    setTotals(calculatedTotals);
  }, [lineItems]);

  if (!isOpen2) return null;

  const handleAddLineItem = () => {
    setEditItemId(null);
    setAddItemModalOpen(true);
  };

  const handleSaveLineItem = (itemData) => {
    if (editItemId) {
      setLineItems((prev) =>
        prev.map((item) =>
          item.id === editItemId
            ? {
                ...item,
                serviceId: itemData.ProductId,
                serviceName: itemData.ProductId,
                am: itemData.am,
                fee: itemData.fee,
                prdis: itemData.prdis,
                dis: itemData.dis,
                adis: itemData.adis,
              }
            : item
        )
      );
      setEditItemId(null);
    } else {
      const newItem = {
        id: Date.now(),
        serviceId: itemData.ProductId,
        serviceName: itemData.ProductId,
        am: itemData.am,
        fee: itemData.fee,
        exchangeRate: 0,
        currencyAmount: 0,
        prdis: itemData.prdis,
        dis: itemData.dis,
        adis: itemData.adis,
      };
      setLineItems((prev) => [...prev, newItem]);
    }
    calculateTotals();
  };

  // removed unused inline edit handler; we edit via modal

  const handleDeleteLineItem = (id) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
    calculateTotals();
  };

  const handleEditLineItem = (id) => {
    setEditItemId(id);
    setAddItemModalOpen(true);
  };

  const calculateTotals = () => {
    // Calculate totals based on line items
    const calculatedTotals = lineItems.reduce(
      (acc, item) => {
        acc.tprdis += item.am * item.fee || 0;
        acc.tdis += item.prdis || 0;
        acc.tdis += item.dis || 0;
        acc.tadis += item.adis || 0;
        return acc;
      },
      {
        tprdis: 0,
        tdis: 0,
        tadis: 0,
        cap: 0,
        insp: 0,
        tvam: 0,
        todam: 0,
        tbill: 0,
      }
    );

    calculatedTotals.tbill =
      calculatedTotals.tadis +
      calculatedTotals.tvam +
      calculatedTotals.todam;

    setTotals(calculatedTotals);
  };

  const handleSave = () => {
    console.log("Saving invoice:", { invoiceData, lineItems, totals });
    // TODO: Implement save functionality
  };

  const handleSaveAndSend = () => {
    console.log("Saving and sending invoice:", {
      invoiceData,
      lineItems,
      totals,
    });
    // TODO: Implement save and send functionality
  };

  const handleCancel = () => {
    onClose2();
  };

  const handlePrint = () => {
    if (!lineItems || lineItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "فاکتوری موجود نیست",
        text: "لطفاً ابتدا فاکتور جدید اضافه کنید.",
        confirmButtonText: "باشه",
      });
      return;
    }

    const rowsHtml = lineItems
      .map(
        (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.serviceId ?? ""}</td>
            <td>${item.serviceName ?? ""}</td>
            <td>${item.am ?? 0}</td>
            <td>${item.fee ?? 0}</td>
            <td>${item.exchangeRate ?? 0}</td>
            <td>${item.currencyAmount ?? 0}</td>
            <td>${item.prdis ?? 0}</td>
            <td>${item.adis ?? 0}</td>
          </tr>`
      )
      .join("");

    const html = `
      <!doctype html>
      <html lang="fa" dir="rtl">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>چاپ فاکتور</title>
          <style>
            body { font-family: Vazirmatn, Tahoma, Arial, sans-serif; padding: 24px; background: #fff; color: #111; }
            h1 { font-size: 18px; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #999; padding: 8px; font-size: 12px; text-align: center; }
            thead { background: #f0f0f0; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>جدول اقلام فاکتور</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>شناسه خدمت/کالا</th>
                <th>نام خدمت/کالا</th>
                <th>تعداد/مقدار</th>
                <th>مبلغ واحد</th>
                <th>نرخ برابری ارز با ریال</th>
                <th>میزان ارز</th>
                <th>مبلغ تخفیف</th>
                <th>مبلغ بعد از تخفیف</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </body>
      </html>`;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur overflow-y-auto">
      <div
        className="w-[95%] min-h-[95%] max-w-7xl bg-[#23234a] rounded-lg shadow-2xl relative flex flex-col my-4"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-3 rounded-t-lg flex items-center justify-between">
          <h2 className="text-lg font-bold">فاکتور فروش جدید</h2>
          <div className="text-sm">تاریخ مجاز ارسال از : ۱۴۰۴/۰۷/۰۸</div>
          <div className="flex items-center gap-2">
            <SlPrinter onClick={handlePrint} className="cursor-pointer" />
            <button
              onClick={handleCancel}
              className="text-white/80 hover:text-white p-1"
            >
              <MdClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Details Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {/* نوع (inty) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                نوع
              </label>
              <div className="relative">
                <select
                  value={invoiceData.inty}
                  onChange={(e) => handleInputChange("inty", e.target.value)}
                  className="w-full  px-2 py-[7px] border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">نوع اول</option>
                  <option value="2">نوع دوم</option>
                  <option value="3">نوع سوم</option>
                </select>
              
              </div>
            </div>

            {/* الگوی (inp) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                الگوی
              </label>
              <div className="relative">
                <select
                  value={invoiceData.inp}
                  onChange={(e) => handleInputChange("inp", e.target.value)}
                 className="w-full px-2 py-[7px] border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                   <option value="">انتخاب الگوی صورتحساب</option>
              <option value="1">الگوی اول (فروش)</option>
              <option value="2">الگوی دوم (فروش ارزی)</option>
              <option value="3">
                الگوی سوم (صورتحساب طلا، جواهر و پلاتین){" "}
              </option>
              <option value="4">الگوی چهارم (قرارداد پیمانکاری) </option>
              <option value="5">الگوی پنجم (قبوض خدماتی)</option>
              <option value="6">الگوی ششم (بلیط هواپیما)</option>
              <option value="7">الگوی هفتم (صادرات)</option>
              <option value="8">الگوی هشتم (بارنامه)</option>
              <option value="11">
                الگوی یازدهم (بورس اوراق بهادار مبتنی بر کالا){" "}
              </option>
              <option value="13">الگوی سیزدهم (فروش خدمات بیمهای)</option>
                </select>
              
              </div>
            </div>

            {/* تاریخ صدور (InDatIM) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                تاریخ صدور
              </label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={invoiceData.indatim}
                onChange={(date) => handleInputChange("indatim", date)}
                calendarPosition="bottom-right"
                inputClass="w-full bg-gray-800/70 text-white/90 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                format="YYYY/MM/DD HH:mm:ss"
                editable={false}
              />
            </div>

            {/* تاریخ ایجاد (Creation Date) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                تاریخ ایجاد
              </label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={invoiceData.indati2m}
                onChange={(date) => handleInputChange("indati2m", date)}
                calendarPosition="bottom-right"
                inputClass="w-full bg-gray-800/70 text-white/90 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                format="YYYY/MM/DD HH:mm:ss"
                editable={false}
              />
            </div>

           

            {/* مشتری جدید (New crn) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                مشتری جدید
              </label>
              <input
                type="text"
                value={invoiceData.crn}
                onChange={(e) => handleInputChange("crn", e.target.value)}
                placeholder="انتخاب کنید"
                className="w-full px-4 bg-gray-800/70 text-white/90 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dir="rtl"
              />
            </div>

            {/* کد شعبه خریدار (Buyer Branch Code) */}
           
            <div>
             <label className="block mb-2 text-gray-100 text-sm font-medium">
                کد شعبه خریدار
              </label>
              <input
                type="text"
                value={invoiceData.crn}
                 onChange={(e) =>
                  handleInputChange("bbc", e.target.value)
                }
                placeholder="انتخاب کنید"
                className="w-full px-4 bg-gray-800/70 text-white/90 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dir="rtl"
              />
            </div>

            {/* روش تسویه (Settlement Method) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                روش تسویه
              </label>
              <select
                value={invoiceData.setm}
                onChange={(e) =>
                  handleInputChange("setm", e.target.value)
                }
                className="w-full  px-2 py-[7px] border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">نقدی</option>
                <option value="2">نسیه</option>
                <option value="3">نسیه/نقدی</option>
              </select>
            </div>

               {/* کد شعبه فروشنده (Seller Branch Code) */}
              
              <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                کد شعبه فروشنده
              </label>
              <input
                type="text"
                value={invoiceData.MyInvoiceId}
                onChange={(e) =>
                  handleInputChange("sbc", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ش ف در سامانه مشتری (crn System ID) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                ش ف در سامانه مشتری
              </label>
              <input
                type="text"
                value={invoiceData.MyInvoiceId}
                onChange={(e) =>
                  handleInputChange("MyInvoiceId", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

         

             {/* توضیحات (comment) */}
             <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                توضیحات
              </label>
              <input
                type="text"
                value={invoiceData.comment}
                onChange={(e) =>
                  handleInputChange("comment", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Add New Item Button */}
        <div className="w-full px-6 flex items-center justify-end">
          <div className="mb-4">
            <button onClick={handleAddLineItem} className="btn-custom">
              جدید
              <HiOutlinePlusSm className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Line Items Section */}
        <div className="flex-1  px-6 pb-4">
          {/* Table Header */}
          <div className="bg-[#1A2035] text-white px-4 py-3 rounded-t-lg">
            <div className="grid grid-cols-9 gap-2 text-sm font-medium text-right">
              <div>شناسه خدمت/کالا</div>
              <div>نام خدمت/کالا</div>
              <div>تعداد/مقدار</div>
              <div>مبلغ واحد</div>
              <div>نرخ برابری ارز با ریال</div>
              <div>میزان ارز</div>
              <div>مبلغ تخفیف</div>
              <div>مبلغ بعد از تخفیف</div>
              <div className="text-center">عملیات</div>
            </div>
          </div>

          {/* Table Content */}
          <div className=" rounded-b-lg min-h-[200px] max-h-[300px] overflow-y-auto">
            {lineItems.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-100">
                رکوردی وجود ندارد
              </div>
            ) : (
              <div>
                {lineItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`grid grid-cols-9 gap-2 p-2 text-white  ${
                      index % 2 === 0 ? "bg-gray-600" : "bg-gray-500"
                    }`}
                  >
                    <span className="px-2 py-1  text-sm text-right">
                      {item.serviceId}
                    </span>
                    <span className="px-2 py-1  text-sm text-right">
                      {item.serviceName}
                    </span>
                    <span className="px-2 py-1  text-sm text-right">
                      {item.am}
                    </span>
                    <span className="px-2 py-1  text-sm text-right">
                      {item.fee}
                    </span>
                    <span className="px-2 py-1  text-sm text-right">
                      {item.exchangeRate}
                    </span>
                    <span className="px-2 py-1  text-sm text-right">
                      {item.currencyAmount}
                    </span>
                    <span className="px-2 py-1  text-sm text-right">
                      {item.prdis}
                    </span>
                    <span className="px-2 py-1  text-sm text-right">
                      {item.adis}
                    </span>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleDeleteLineItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditLineItem(item.id)}
                        className="text-white hover:text-green-600"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Financial Summary Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مبلغ قبل از تخفیف
              </label>
              <input
                type="number"
                value={totals.tprdis}
                readOnly
                className="w-full px-3 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م تخفیفات
              </label>
              <input
                type="number"
                value={totals.tdis}
                readOnly
                className="w-full px-3 py-2  bg-gray-800/70 text-white/90 border border-gray-300 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مبلغ پس از کسر تخفیف
              </label>
              <input
                type="number"
                value={totals.tadis}
                readOnly
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مبلغ پرداختی نقدی
              </label>
              <input
                type="number"
                value={totals.cap}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    cap: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                 مبلغ نسیه
              </label>
              <input
                type="number"
                value={totals.insp}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    insp: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مالیات بر ارزش افزوده
              </label>
              <input
                type="number"
                value={totals.tvam}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    tvam: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م سایر مالیات
              </label>
              <input
                type="number"
                value={totals.todam}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    todam: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-800/70 text-white/90 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                مبلغ کل
              </label>
              <input
                type="number"
                value={totals.tbill}
                readOnly
                className="w-full px-3 py-2 bg-gray-800/70 text-white/90  border border-gray-300 rounded  font-bold"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className=" px-6 py-4 rounded-b-lg">
          <div className="flex justify-center gap-4 w-full">
            <button
              onClick={handleCancel}
              className="bg-red-500 w-1/3 text-white px-8 py-3 rounded-lg font-medium  hover:bg-red-600 transition-colors"
            >
              انصراف
            </button>
            <button onClick={handleSaveAndSend} className="btn-custom4">
              ذخیره و ارسال
            </button>
            <button onClick={handleSave} className="btn-custom4">
              ذخیره
            </button>
          </div>
        </div>

        {/* Add Line Item Modal */}
        <AddLineItemModal
          isOpen={addItemModalOpen}
          onClose={() => {
            setAddItemModalOpen(false);
            setEditItemId(null);
          }}
          onSave={handleSaveLineItem}
          initialData={
            editItemId
              ? {
                  ProductId: lineItems.find((x) => x.id === editItemId)
                    ?.serviceName,
                  am: lineItems.find((x) => x.id === editItemId)
                    ?.am,
                  fee: lineItems.find((x) => x.id === editItemId)
                    ?.fee,
                  prdis: lineItems.find((x) => x.id === editItemId)
                    ?.prdis,
                    dis: lineItems.find((x) => x.id === editItemId)
                    ?.dis,
                  adis: lineItems.find(
                    (x) => x.id === editItemId
                  )?.adis,
                }
              : null
          }
          title={editItemId ? "ویرایش" : "جدید"}
        />
      </div>
    </div>
  );
}

CreateModalInvoices.propTypes = {
  isOpen2: PropTypes.bool.isRequired,
  onClose2: PropTypes.func.isRequired,
};
