import { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import {  MdClose } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AddLineItemModal from "./AddLineItemModal";
import PropTypes from "prop-types";
import { SlPrinter } from "react-icons/sl";


export default function CreateModalInvoices({ isOpen2, onClose2 }) {
  const [invoiceData, setInvoiceData] = useState({
    type: "",
    pattern: "",
    issueDate: new Date(),
    creationDate: new Date(),
    description: "",
    customer: "",
    buyerBranchCode: "",
    settlementMethod: "نقدی",
    customerSystemId: "",
    sellerBranchCode: "",
  });

  const [lineItems, setLineItems] = useState([]);
  const [totals, setTotals] = useState({
    totalBeforeDiscount: 0,
    totalDiscounts: 0,
    totalAfterDiscount: 0,
    totalCashPaid: 0,
    totalCredit: 0,
    totalVAT: 0,
    totalOtherTaxes: 0,
    totalAmount: 0,
  });

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  if (!isOpen2) return null;

  const handleInputChange = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddLineItem = () => {
    setAddItemModalOpen(true);
  };

  const handleSaveLineItem = (itemData) => {
    const newItem = {
      id: Date.now(),
      serviceId: itemData.serviceItem,
      serviceName: itemData.serviceItem,
      quantity: itemData.quantity,
      unitPrice: itemData.unitPrice,
      exchangeRate: 0,
      currencyAmount: 0,
      discountAmount: itemData.discountAmount,
      amountAfterDiscount: itemData.amountAfterDiscount,
    };
    setLineItems((prev) => [...prev, newItem]);
    calculateTotals();
  };

  const handleLineItemChange = (id, field, value) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    calculateTotals();
  };

  const calculateTotals = () => {
    // Calculate totals based on line items
    const calculatedTotals = lineItems.reduce(
      (acc, item) => {
        acc.totalBeforeDiscount += item.quantity * item.unitPrice || 0;
        acc.totalDiscounts += item.discountAmount || 0;
        acc.totalAfterDiscount += item.amountAfterDiscount || 0;
        return acc;
      },
      {
        totalBeforeDiscount: 0,
        totalDiscounts: 0,
        totalAfterDiscount: 0,
        totalCashPaid: 0,
        totalCredit: 0,
        totalVAT: 0,
        totalOtherTaxes: 0,
        totalAmount: 0,
      }
    );

    calculatedTotals.totalAmount =
      calculatedTotals.totalAfterDiscount +
      calculatedTotals.totalVAT +
      calculatedTotals.totalOtherTaxes;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur">
      <div
        className="w-[95%] h-[95%] max-w-7xl bg-[#23234a] rounded-lg shadow-2xl relative flex flex-col"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-3 rounded-t-lg flex items-center justify-between">
          <h2 className="text-lg font-bold">فاکتور فروش جدید</h2>
          <div className="text-sm">تاریخ مجاز ارسال از : ۱۴۰۴/۰۷/۰۸</div>
          <div className="flex items-center gap-2">
           <SlPrinter className="cursor-pointer" />
            <button 
             onClick={handleCancel}
            className="text-white/80 hover:text-white p-1">
              <MdClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Details Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* نوع (Type) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                نوع
              </label>
              <div className="relative">
                <select
                  value={invoiceData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-800/70 text-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pl-8"
                >
                  <option value="">نوع اول</option>
                  <option value="type1">نوع اول</option>
                  <option value="type2">نوع دوم</option>
                </select>
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            </div>

            {/* الگوی (Pattern) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                الگوی
              </label>
              <div className="relative">
                <select
                  value={invoiceData.pattern}
                  onChange={(e) => handleInputChange("pattern", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-800/70 text-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pl-8"
                >
                  <option value="">الگوی اول (فروش)</option>
                  <option value="pattern1">الگوی اول (فروش)</option>
                  <option value="pattern2">الگوی دوم (فروش ارزی)</option>
                </select>
                <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" >
                  ×
                </button>
              </div>
            </div>

            {/* تاریخ صدور (Issue Date) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                تاریخ صدور
              </label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={invoiceData.issueDate}
                onChange={(date) => handleInputChange("issueDate", date)}
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
                value={invoiceData.creationDate}
                onChange={(date) => handleInputChange("creationDate", date)}
                calendarPosition="bottom-right"
                inputClass="w-full bg-gray-800/70 text-white/90 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                format="YYYY/MM/DD HH:mm:ss"
                editable={false}
              />
            </div>

            {/* توضیحات (Description) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                توضیحات
              </label>
              <input
                type="text"
                value={invoiceData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* مشتری جدید (New Customer) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                مشتری جدید
              </label>
              <input
                type="text"
                value={invoiceData.customer}
                onChange={(e) => handleInputChange("customer", e.target.value)}
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
              <select
                value={invoiceData.buyerBranchCode}
                onChange={(e) =>
                  handleInputChange("buyerBranchCode", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب کنید</option>
                <option value="branch1">شعبه 1</option>
                <option value="branch2">شعبه 2</option>
              </select>
            </div>

            {/* روش تسویه (Settlement Method) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                روش تسویه
              </label>
              <select
                value={invoiceData.settlementMethod}
                onChange={(e) =>
                  handleInputChange("settlementMethod", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="نقدی">نقدی</option>
                <option value="اعتباری">اعتباری</option>
                <option value="چکی">چکی</option>
              </select>
            </div>

            {/* ش ف در سامانه مشتری (Customer System ID) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                ش ف در سامانه مشتری
              </label>
              <input
                type="text"
                value={invoiceData.customerSystemId}
                onChange={(e) =>
                  handleInputChange("customerSystemId", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* کد شعبه فروشنده (Seller Branch Code) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                کد شعبه فروشنده
              </label>
              <select
                value={invoiceData.sellerBranchCode}
                onChange={(e) =>
                  handleInputChange("sellerBranchCode", e.target.value)
                }
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب کنید</option>
                <option value="seller1">فروشنده 1</option>
                <option value="seller2">فروشنده 2</option>
              </select>
            </div>
          </div>
        </div>

         {/* Add New Item Button */}
        <div className="w-full px-6 flex items-center justify-end">
        <div className="mb-4">
            <button
              onClick={handleAddLineItem}
              className="btn-custom"
            >
              جدید
              <HiOutlinePlusSm className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Line Items Section */}
        <div className="flex-1  px-6 pb-4">
          {/* Table Header */}
          <div className="bg-[#1A2035] text-white px-4 py-3 rounded-t-lg mb-2">
            <div className="grid grid-cols-8 gap-2 text-sm font-medium text-right">
              <div>شناسه خدمت/کالا</div>
              <div>نام خدمت/کالا</div>
              <div>تعداد/مقدار</div>
              <div>مبلغ واحد</div>
              <div>نرخ برابری ارز با ریال</div>
              <div>میزان ارز</div>
              <div>مبلغ تخفیف</div>
              <div>مبلغ بعد از تخفیف</div>
            </div>
          </div>

         

          {/* Table Content */}
          <div className=" rounded-b-lg min-h-[200px] max-h-[300px] overflow-y-auto">
            {lineItems.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-100">
                رکوردی وجود ندارد
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-8 gap-2 bg-white p-2 rounded border"
                  >
                    <input
                      type="text"
                      value={item.serviceId}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "serviceId",
                          e.target.value
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm text-right"
                    />
                    <input
                      type="text"
                      value={item.serviceName}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "serviceName",
                          e.target.value
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm text-right"
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "quantity",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "unitPrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      value={item.exchangeRate}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "exchangeRate",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      value={item.currencyAmount}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "currencyAmount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      value={item.discountAmount}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "discountAmount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      value={item.amountAfterDiscount}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "amountAfterDiscount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
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
                value={totals.totalBeforeDiscount}
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
                value={totals.totalDiscounts}
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
                value={totals.totalAfterDiscount}
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
                value={totals.totalCashPaid}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    totalCashPaid: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مبلغ نسیه
              </label>
              <input
                type="number"
                value={totals.totalCredit}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    totalCredit: parseFloat(e.target.value) || 0,
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
                value={totals.totalVAT}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    totalVAT: parseFloat(e.target.value) || 0,
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
                value={totals.totalOtherTaxes}
                onChange={(e) =>
                  setTotals((prev) => ({
                    ...prev,
                    totalOtherTaxes: parseFloat(e.target.value) || 0,
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
                value={totals.totalAmount}
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
            <button
              onClick={handleSaveAndSend}
              className="btn-custom4"
            >
              ذخیره و ارسال
            </button>
            <button
              onClick={handleSave}
              className="btn-custom4"
            >
              ذخیره
            </button>
          </div>
        </div>

        {/* Add Line Item Modal */}
        <AddLineItemModal
          isOpen={addItemModalOpen}
          onClose={() => setAddItemModalOpen(false)}
          onSave={handleSaveLineItem}
        />
      </div>
    </div>
  );
}

CreateModalInvoices.propTypes = {
  isOpen2: PropTypes.bool.isRequired,
  onClose2: PropTypes.func.isRequired,
};
