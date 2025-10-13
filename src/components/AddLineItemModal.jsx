import { useState } from "react";
import { GrClose } from "react-icons/gr";
import PropTypes from "prop-types";

export default function AddLineItemModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    serviceItem: "",
    quantity: 0,
    unitPrice: 0,
    contractNumber: "",
    isCurrency: false,
    discountAmount: 0,
    amountAfterDiscount: 0,
    vatRate: 0,
    cashShare: 0,
    totalAmount: 0,
    vat: 0,
    otherTaxes: 0,
    otherLegalFees: 0,
    description: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      serviceItem: "",
      quantity: 0,
      unitPrice: 0,
      contractNumber: "",
      isCurrency: false,
      discountAmount: 0,
      amountAfterDiscount: 0,
      vatRate: 0,
      cashShare: 0,
      totalAmount: 0,
      vat: 0,
      otherTaxes: 0,
      otherLegalFees: 0,
      description: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[80vh] bg-[#23234a] rounded-lg shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div 
        className="bg-[#1A2035] text-white px-6 py-3 rounded-t-lg flex items-center justify-between flex-shrink-0">
          
          <h2 className="text-lg font-bold">جدید</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl"
          >
            <GrClose />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* کالا/ خدمت جدید (New Item/Service) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                کالا/ خدمت جدید
              </label>
              <input
                type="text"
                value={formData.serviceItem}
                onChange={(e) =>
                  handleInputChange("serviceItem", e.target.value)
                }
                placeholder="انتخاب کنید"
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* تعداد/مقدار (Quantity/Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                تعداد/مقدار
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  handleInputChange("quantity", parseFloat(e.target.value) || 0)
                }
                step="0.001"
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ واحد (Unit Price) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ واحد
              </label>
              <input
                type="number"
                value={formData.unitPrice}
                onChange={(e) =>
                  handleInputChange(
                    "unitPrice",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ قبل از تخفیف (Amount Before Discount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ قبل از تخفیف
              </label>
              <input
                type="number"
                value={
                  formData.discountAmount === 0
                    ? formData.unitPrice * formData.quantity
                    : 0
                }
                readOnly
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* مبلغ تخفیف (Discount Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ تخفیف
              </label>
              <input
                type="number"
                value={formData.discountAmount}
                onChange={(e) =>
                  handleInputChange(
                    "discountAmount",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ بعد از تخفیف (Amount After Discount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ بعد از تخفیف
              </label>
              <input
                type="number"
                value={formData.amountAfterDiscount}
                onChange={(e) =>
                  handleInputChange(
                    "amountAfterDiscount",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* نرخ مالیات بر ارزش افزوده (VAT Rate) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                نرخ مالیات بر ارزش افزوده
              </label>
              <input
                type="number"
                value={formData.vatRate}
                onChange={(e) =>
                  handleInputChange("vatRate", parseFloat(e.target.value) || 0)
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مالیات بر ارزش افزوده (Value Added Tax) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مالیات بر ارزش افزوده
              </label>
              <input
                type="number"
                value={formData.vat}
                onChange={(e) =>
                  handleInputChange("vat", parseFloat(e.target.value) || 0)
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ سایر مالیات و عوارض (Other Taxes and Duties Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ سایر مالیات و عوارض
              </label>
              <input
                type="number"
                value={formData.otherTaxes}
                onChange={(e) =>
                  handleInputChange(
                    "otherTaxes",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ سایر وجوه قانونی (Other Legal Fees Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ سایر وجوه قانونی
              </label>
              <input
                type="number"
                value={formData.otherLegalFees}
                onChange={(e) =>
                  handleInputChange(
                    "otherLegalFees",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* سهم نقدی از پرداخت (Cash Share of Payment) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                سهم نقدی از پرداخت
              </label>
              <input
                type="number"
                value={formData.cashShare}
                onChange={(e) =>
                  handleInputChange(
                    "cashShare",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ کل (Total Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ کل
              </label>
              <input
                type="number"
                value={formData.totalAmount}
                onChange={(e) =>
                  handleInputChange(
                    "totalAmount",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* شماره قرارداد حق العمل کاری (Contract Number) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                شماره قرارداد حق العمل کاری
              </label>
              <input
                type="text"
                value={formData.contractNumber}
                onChange={(e) =>
                  handleInputChange("contractNumber", e.target.value)
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* ارزی (Currency) - Toggle Switch */}
            <div className="flex flex-col items-start gap-2">
              <label className="block  text-gray-100 text-xs font-medium">
                ارزی
              </label>
              <div
              dir="ltr"
              className="flex items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleToggleChange("isCurrency")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    formData.isCurrency ? "bg-blue-600" : "bg-[#23234a]"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      formData.isCurrency ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* توضیحات (Description) - Full width */}
            <div className="col-span-2 lg:col-span-3">
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                توضیحات
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-3 border-t border-gray-200 flex justify-center gap-4 flex-shrink-0">
        <button
  onClick={handleCancel}
  className="px-6 w-1/2 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
>
  انصراف
</button>

          <button
            onClick={handleSave}
            className="btn-custom4"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

AddLineItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};
