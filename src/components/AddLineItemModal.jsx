import { useEffect, useState, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa";
import PropTypes from "prop-types";
import axiosClient from "../axios-client";

export default function AddLineItemModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}) {
  const [formData, setFormData] = useState({
    ProductId: "",
    am: null,
    fee: null,
    bsrn: "",
    Show: false,
    prdis: null,
    dis: null,
    adis: null,
    vra: null,
    cop: null,
    vop: null,
    tsstam: null,
    vam: null,
    odam: null,
    olam: null,
    comment: "",
    name: null,
    sstid: null,
  });
  const [feeInputValue, setFeeInputValue] = useState(""); // مقدار فرمت‌شده برای نمایش مبلغ واحد
  const [disInputValue, setDisInputValue] = useState(""); // مقدار فرمت‌شده برای نمایش مبلغ تخفیف
  const [dataTable, setDataTable] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dropdownRef = useRef(null);
  const [feeVariable, setFeeVariable] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ProductId: initialData.ProductId ?? "",
          am: initialData.am,
          fee: initialData.fee ?? 0,
          bsrn: initialData.bsrn ?? "",
          Show: initialData.Show ?? false,
          prdis: initialData.prdis ?? 0,
          dis: initialData.dis ?? 0,
          adis: initialData.adis ?? 0,
          vra: initialData.vra ?? 0,
          cop: initialData.cop ?? 0,
          vop: initialData.vop ?? 0,
          tsstam: initialData.tsstam ?? 0,
          vam: initialData.vam ?? 0,
          odam: initialData.odam ?? 0,
          olam: initialData.olam ?? 0,
          comment: initialData.comment ?? "",
          name: initialData.name ?? "",
          sstid: initialData.sstid ?? "",
        });
        // Find and set the selected product based on ProductId
        const product = dataTable.find((p) => p.id == initialData.ProductId);
        setSelectedProduct(product || null);
      } else {
        setFormData({
          ProductId: "",
          am: null,
          fee: null,
          bsrn: "",
          Show: false,
          prdis: null,
          dis: null,
          adis: null,
          vra: null,
          cop: null,
          vop: null,
          tsstam: null,
          vam: null,
          odam: null,
          olam: null,
          comment: "",
          name: null,
          sstid: null,
        });
        setSelectedProduct(null);
      }
      setIsDropdownOpen(false);
    }
  }, [isOpen, initialData, dataTable]);

  // مقدار اولیه نمایش مبلغ واحد را طبق مقدار اولیه fee ست کن
  useEffect(() => {
    if (isOpen) {
      setFeeInputValue(
        formData.fee !== null &&
          formData.fee !== undefined &&
          formData.fee !== ""
          ? numberWithCommas(formData.fee)
          : ""
      );
    }
  }, [isOpen, formData.fee]);
  // مقدار اولیه برای نمایش تخفیف
  useEffect(() => {
    if (isOpen) {
      setDisInputValue(
        formData.dis !== null &&
          formData.dis !== undefined &&
          formData.dis !== ""
          ? numberWithCommas(formData.dis)
          : ""
      );
    }
  }, [isOpen, formData.dis]);

  // تابع برای فرمت سه‌رقمی
  function numberWithCommas(value) {
    if (value === null || value === undefined || value === "") return "";
    // فقط اعداد و اعشار
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  useEffect(() => {
    axiosClient
      .get(`/products`)
      .then((response) => {
      
        setDataTable(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (field, value, rawInput) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [field]: value,
      };

      // Calculate adis when am, fee, or dis changes
      if (field === "am" || field === "fee" || field === "dis") {
        const am = field === "am" ? value : prev.am;
        const fee = field === "fee" ? value : prev.fee;
        const dis = field === "dis" ? value : prev.dis;

        if (am && fee) {
          const totalAmount = am * fee;
          newData.adis = totalAmount - (dis || 0);
          newData.prdis = totalAmount;
        }

        if (am && fee) {
          const totalAmount = am * fee;
          newData.adis = totalAmount - (dis || 0);
          newData.tsstam = totalAmount - (dis || 0);
        }
      }

      return newData;
    });
    if (field === "fee") {
      // موقع تغییر کاربر، مقدار فرمت‌شده را هم به صورت همزمان آپدیت کن
      setFeeInputValue(
        rawInput !== undefined ? rawInput : numberWithCommas(value)
      );
    }
    if (field === "dis") {
      setDisInputValue(
        rawInput !== undefined ? rawInput : numberWithCommas(value)
      );
    }
  };

  const handleToggleChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    handleInputChange("ProductId", product.id);
    handleInputChange("name", product.title);
    handleInputChange("sstid", product.sstid);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      ProductId: "",
      am: null,
      fee: null,
      bsrn: "",
      Show: false,
      prdis: null,
      dis: null,
      adis: null,
      vra: null,
      cop: null,
      vop: null,
      tsstam: null,
      vam: null,
      odam: null,
      olam: null,
      comment: "",
      name: null,
      sstid: null,
    });
    setSelectedProduct(null);
    setIsDropdownOpen(false);
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
        <div className="bg-[#1A2035] text-white px-6 py-3 rounded-t-lg flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold">{title || "جدید"}</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl"
          >
            <GrClose />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* کالا/ خدمت جدید (New Item/Service) */}
            <div className="relative" ref={dropdownRef}>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                کالا/ خدمت جدید
              </label>

              {/* Custom Dropdown Button */}
              <button
                type="button"
                onClick={toggleDropdown}
                className="w-full px-2 py-[5px] border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right flex items-center justify-between"
              >
                <span className="truncate">
                  {selectedProduct ? selectedProduct.title : "انتخاب کنید"}
                </span>
                <FaChevronDown
                  className={`text-sm text-white/70 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Custom Dropdown List */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-h-80 overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-700 px-3 py-2 border-b border-gray-600">
                    <div className="grid grid-cols-2 gap-4 text-xs font-medium text-white/80">
                      <span>نام کالا</span>
                      <span>شناسه کالا</span>
                    </div>
                  </div>

                  {/* Table Body - Scrollable */}
                  <div className="max-h-64 overflow-y-auto">
                    {(dataTable || []).length === 0 ? (
                      <div className="px-3 py-4 text-center text-white/60 text-sm">
                        اطلاعاتی یافت نشد
                      </div>
                    ) : (
                      (dataTable || []).map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductSelect(product)}
                          className="w-full px-3 py-2 hover:bg-gray-700 transition-colors duration-150 border-b border-gray-700/50 last:border-b-0"
                        >
                          <div className="grid grid-cols-2 gap-4 text-sm text-white/90 text-right">
                            <span className="truncate">
                              {product.title || "-"}
                            </span>
                            <span className="truncate">
                              {product.sstid || "-"}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* تعداد/مقدار (am/Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                تعداد/مقدار
              </label>
              <input
                type="text"
                value={formData.am}
                onChange={(e) =>
                  handleInputChange("am", parseFloat(e.target.value))
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
                type="text"
                value={feeInputValue}
                onChange={(e) => {
                  // حذف کاماها برای مقدار قابل محاسبه، سپس فرمت مجدد برای نمایش
                  const raw = e.target.value.replace(/,/g, "");
                  const floatValue = parseFloat(raw) || 0;
                  handleInputChange("fee", floatValue, numberWithCommas(raw));
                }}
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* شماره قرارداد حق العمل کاری (Contract text) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                شماره قرارداد حق العمل کاری
              </label>
              <input
                type="text"
                value={formData.bsrn}
                onChange={(e) => handleInputChange("bsrn", e.target.value)}
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ تخفیف (Discount Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ تخفیف
              </label>
              <input
                type="text"
                value={disInputValue}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");
                  const floatValue = parseFloat(raw) || 0;
                  handleInputChange("dis", floatValue, numberWithCommas(raw));
                }}
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* مبلغ قبل از تخفیف (Amount Before Discount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ قبل از تخفیف
              </label>
              <input
                type="text"
                value={ formData.prdis ? Number(formData.prdis).toLocaleString("fa-IR") : ""}
                readOnly
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm cursor-not-allowed"
              />
            </div>

            {/* مبلغ بعد از تخفیف (Amount After Discount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                مبلغ بعد از تخفیف
              </label>
              <input
                type="text"
                value={ formData.adis ? Number(formData.adis).toLocaleString("fa-IR") : ""}
                readOnly
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm cursor-not-allowed"
              />
            </div>

            {/* نرخ مالیات بر ارزش افزوده (vam Rate) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                نرخ مالیات بر ارزش افزوده
              </label>
              <input
                type="text"
                value={formData.vra}
                onChange={(e) =>
                  handleInputChange("vra", parseFloat(e.target.value) || 0)
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
                type="text"
                value={formData.vam}
                onChange={(e) =>
                  handleInputChange("vam", parseFloat(e.target.value) || 0)
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
                type="text"
                value={formData.odam}
                onChange={(e) =>
                  handleInputChange("odam", parseFloat(e.target.value) || 0)
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
                type="text"
                value={formData.olam}
                onChange={(e) =>
                  handleInputChange("olam", parseFloat(e.target.value) || 0)
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
                type="text"
                value={formData.cop}
                onChange={(e) =>
                  handleInputChange("cop", parseFloat(e.target.value) || 0)
                }
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/*  سهم مالیات از ارزش افزوده از پرداخت (Total Amount) */}
            <div>
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                سهم مالیات از ارزش افزوده از پرداخت
              </label>
              <input
                type="text"
                value={formData.vop}
                onChange={(e) =>
                  handleInputChange("vop", parseFloat(e.target.value) || 0)
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
                type="text"
                value={ formData.tsstam ? Number(formData.tsstam).toLocaleString("fa-IR") : ""}
                // onChange={(e) =>
                //   handleInputChange("tsstam", parseFloat(e.target.value) || 0)
                // }
                readOnly
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* ارزی (Currency) - Toggle Switch */}
            <div className="flex flex-col items-start gap-2">
              <label className="block  text-gray-100 text-xs font-medium">
                ارزی
              </label>
              <div dir="ltr" className="flex items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleToggleChange("Show")}
                  className={`relative inline-flex h-5 border border-gray-300 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    formData.Show ? "bg-blue-600" : "bg-[#23234a]"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      formData.Show ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* توضیحات (comment) - Full width */}
            <div className="col-span-2 lg:col-span-3">
              <label className="block mb-1 text-gray-100 text-xs font-medium">
                توضیحات
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => handleInputChange("comment", e.target.value)}
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

          <button onClick={handleSave} className="btn-custom4">
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
  initialData: PropTypes.object,
  title: PropTypes.string,
};
