import { useEffect, useState, useRef } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AddLineItemModalReveiw from "./AddLineItemModalReveiw";
import PropTypes from "prop-types";
import { SlPrinter } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import axiosClient from "../axios-client";
import ReactDOMServer from "react-dom/server";
import PrintableInvoice from "./PrintableInvoice";

export default function CreateModalReview({
  isOpen2,
  onClose2,
  refresh,
  setRefresh,
  customers,
}) {
  // مقدار اولیه stateها برای ریست راحت
  const initialInvoiceData = {
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
  };
  const initialTotals = {
    tprdis: 0,
    tdis: 0,
    tadis: 0,
    cap: 0,
    insp: 0,
    tvam: 0,
    todam: 0,
    tbill: 0,
  };
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [lineItems, setLineItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [totals, setTotals] = useState(initialTotals);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalOdam, setTotalOdam] = useState(0);
  const [olamTotal, setOlamTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const modalContainerRef = useRef(null);

  const formatDateTime = (value) => {
    if (!value) return null;
    try {
      const d = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(d.getTime())) return null;
      const pad = (n) => String(n).padStart(2, "0");
      const yyyy = d.getFullYear();
      const MM = pad(d.getMonth() + 1);
      const dd = pad(d.getDate());
      const HH = pad(d.getHours());
      const mm = pad(d.getMinutes());
      const ss = pad(d.getSeconds());
      return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
    } catch {
      return null;
    }
  };

  const toNumberOrNull = (val) => {
    if (val === undefined || val === null || val === "") return null;
    const n = Number(val);
    return Number.isNaN(n) ? null : n;
  };

  const buildPayload = () => {
    const payload = {
      type: 1,
      send_to_moadian: false,
      customer_id: toNumberOrNull(invoiceData.crn) ?? null,
      // user_reference: null,
      inty: toNumberOrNull(invoiceData.inty),
      irtaxid: null,
      indatim: formatDateTime(invoiceData.indatim),
      indati2m: formatDateTime(invoiceData.indati2m),
      inp: toNumberOrNull(invoiceData.inp),
      ins: 1,
      sbc: invoiceData.sbc?.trim() || null,
      ft: null,
      scln: null,
      scc: null,
      crn: null,
      cdcn: null,
      cdcd: null,
      billid: null,
      setm: toNumberOrNull(invoiceData.setm) ?? 1,
      cap: toNumberOrNull(totals.cap) ?? null,
      insp: toNumberOrNull(totals.insp) ?? null,
      tax17: null,
      tinc: null,
      lno: null,
      lrno: null,
      ocu: null,
      oci: null,
      dco: null,
      dci: null,
      tid: null,
      rid: null,
      lt: null,
      cno: null,
      did: null,
      sg: null, // exm: [{"sgid":null,"sgt":"asd"}]
      asn: null,
      asd: null,
      in: null,
      an: null,
      items: (lineItems || []).map((it) => ({
        product_id: toNumberOrNull(it.serviceId),
        am: toNumberOrNull(it.am),
        nw: null,
        fee: toNumberOrNull(it.fee),
        cfee: toNumberOrNull(it.cfee),
        cut: it.cut || null,
        exr: toNumberOrNull(it.exr),
        ssrv: null,
        sscv: null,
        dis: toNumberOrNull(it.dis) ?? 0,
        consfee: null,
        spro: null,
        bros: null,
        bsrn: it.bsrn || null,
        cui: null,
        cpr: null,
        sovat: null,
        // Additional fields from AddLineItemModal
        vra: toNumberOrNull(it.vra),
        vam: toNumberOrNull(it.vam),
        odam: toNumberOrNull(it.odam),
        olam: toNumberOrNull(it.olam),
        cop: toNumberOrNull(it.cop),
        vop: toNumberOrNull(it.vop),
        tsstam: toNumberOrNull(it.tsstam),
        comment: it.comment || null,
        Show: it.Show || false,
      })),
    };
    return payload;
  };

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
        acc.tdis = item.adis - item.fee || 0;
        acc.tdis = item.adis - item.fee || 0;
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
      calculatedTotals.tadis + calculatedTotals.tvam + calculatedTotals.todam;

    setTotals(calculatedTotals);

    const sumDiscount = lineItems?.reduce(
      (sum, item) => sum + (item?.dis || 0),
      0
    );
    const sumTax = lineItems?.reduce((sum, item) => sum + (item?.vam || 0), 0);
    const sumOdam = lineItems?.reduce(
      (sum, item) => sum + (item?.odam || 0),
      0
    );
    const sumOlam = lineItems?.reduce(
      (sum, item) => sum + (item?.olam || 0),
      0
    );
    const total = lineItems?.reduce((sum, item) => {
      const adis = item?.adis || 0;
      const vam = item?.vam || 0;
      const odam = item?.odam || 0;
      const olam = item?.olam || 0;
      return sum + (adis + vam + odam + olam);
    }, 0);

    setOlamTotal(sumOlam);
    setTotalPrice(total);
    setTotalDiscount(sumDiscount);
    setTax(sumTax);
    setTotalOdam(sumOdam);
  }, [lineItems]);

  const resetForm = () => {
    setInvoiceData(initialInvoiceData);
    setLineItems([]);
    setTotals(initialTotals);
    setEditItemId(null);
  };

  if (!isOpen2) return null;

  const handleAddLineItem = () => {
    setEditItemId(null);
    setAddItemModalOpen(true);
    // Scroll to top of modal
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
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
                name: itemData.name,
                sstid: itemData.sstid,
                vam: itemData?.vam,
                odam: itemData?.odam,
                olam: itemData?.olam,
                cop: itemData?.cop,
                vop: itemData?.vop,
                tsstam: itemData?.tsstam,
                Show: itemData?.Show || false,
                exr: itemData?.exr || null,
                cfee: itemData?.cfee || null,
                cut: itemData?.cut || null,
                bsrn: itemData?.bsrn || "",
                comment: itemData?.comment || "",
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
        name: itemData.name,
        sstid: itemData.sstid,
        vam: itemData?.vam,
        odam: itemData?.odam,
        olam: itemData?.olam,
        cop: itemData?.cop,
        vop: itemData?.vop,
        tsstam: itemData?.tsstam,
        Show: itemData?.Show || false,
        exr: itemData?.exr || null,
        cfee: itemData?.cfee || null,
        cut: itemData?.cut || null,
        bsrn: itemData?.bsrn || "",
        comment: itemData?.comment || "",
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
        acc.tdis = item.adis - item.fee || 0;
        acc.tdis = item.adis - item.fee || 0;
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
      calculatedTotals.tadis + calculatedTotals.tvam + calculatedTotals.todam;

    setTotals(calculatedTotals);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = buildPayload();

    try {
      const res = await axiosClient.post(`/invoices`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Success message
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "فاکتور فروش  با موفقیت اضافه شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      setRefresh(!refresh);
      onClose2();
      resetForm();
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);
      let errorMessage = "خطا در اضافه کردن محصول";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        errorMessage = errorMessages.join("\n");
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error message
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  const handleSaveAndSend = async (e) => {
    e?.preventDefault?.();
    const payload = { ...buildPayload(), send_to_moadian: true };

    try {
      const res = await axiosClient.post(`/invoices`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "صورتحساب ذخیره و ارسال شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: { popup: "swal2-toast" },
      });
      setRefresh(!refresh);
      onClose2();
      resetForm();
    } catch (error) {
      console.error("خطا در ذخیره و ارسال:", error);
      let errorMessage = "خطا در ذخیره و ارسال";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        errorMessage = errorMessages.join("\n");
      } else if (error.message) {
        errorMessage = error.message;
      }
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        customClass: { popup: "swal2-toast" },
      });
    }
  };

  const handleCancel = () => {
    resetForm();
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

    // Get customer name
    const selectedCustomer = customers?.find((c) => c.id == invoiceData.crn);
  
console.log(`selectedCustomer`, selectedCustomer);
    const content = ReactDOMServer.renderToString(
      <PrintableInvoice
        invoiceData={invoiceData}
        lineItems={lineItems}
        customer={selectedCustomer}
      />
    );

    const html = `
      <!doctype html>
      <html lang="fa" dir="rtl">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>چاپ فاکتور</title>
          <style>
            body {
              font-family: Vazirmatn, Tahoma, Arial, sans-serif;
              padding: 24px;
              background: #fff;
              color: #111;
            }
            .invoice-a4 {
              width: 100%;
              max-width: 960px;
              margin: 0 auto;
              border: 1px solid #000;
              padding: 16px;
              box-sizing: border-box;
            }
            .invoice-header-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
              border-bottom: 1px solid #000;
              padding-bottom: 4px;
            }
            .invoice-header-title {
              font-weight: bold;
              font-size: 16px;
            }
            .invoice-header-meta {
              display: flex;
              gap: 4px;
            }
            .invoice-header-cell {
              border: 1px solid #000;
              padding: 2px 6px;
              display: flex;
              flex-direction: column;
              font-size: 11px;
              min-width: 110px;
            }
            .invoice-header-cell span:first-child {
              border-bottom: 1px solid #000;
              margin-bottom: 2px;
              font-weight: bold;
            }
            .party-section {
              border: 1px solid #000;
              margin-top: 8px;
            }
            .party-title {
              border-bottom: 1px solid #000;
              padding: 2px 6px;
              font-weight: bold;
              font-size: 12px;
            }
            .party-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              border-top: 1px solid #000;
              font-size: 11px;
            }
            .party-cell {
              border-left: 1px solid #000;
              border-top: 1px solid #000;
              padding: 2px 4px;
              display: flex;
              flex-direction: column;
            }
            .party-cell:nth-child(4n) {
              border-left: 0;
            }
            .party-cell span:first-child {
              font-weight: bold;
              margin-bottom: 2px;
            }
            .party-cell-wide {
              grid-column: span 2;
            }
            .meta-section {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              border: 1px solid #000;
              border-top: 0;
              margin-bottom: 8px;
              font-size: 11px;
            }
            .meta-cell {
              border-left: 1px solid #000;
              padding: 2px 4px;
              display: flex;
              flex-direction: column;
            }
            .meta-cell:nth-child(4n) {
              border-left: 0;
            }
            .meta-cell span:first-child {
              font-weight: bold;
              margin-bottom: 2px;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 8px;
              font-size: 11px;
            }
            .items-table th,
            .items-table td {
              border: 1px solid #000;
              padding: 2px 4px;
              text-align: center;
            }
            .items-table thead {
              background: #f5f5f5;
            }
            .items-table-footer-label {
              text-align: left;
              font-weight: bold;
            }
            .items-table-footer-value {
              font-weight: bold;
            }
            .footer-row {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr;
              margin-top: 12px;
              font-size: 11px;
            }
            .footer-notes {
              border: 1px solid #000;
              padding: 4px 6px;
              min-height: 60px;
              display: flex;
              flex-direction: column;
              gap: 4px;
            }
            .footer-sign {
              border: 1px solid #000;
              margin-right: 4px;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              padding: 4px 6px;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${content}
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
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur overflow-y-auto"
    >
      <div
        className="w-[95%] min-h-[95%] max-w-7xl bg-[#23234a] rounded-lg shadow-2xl relative flex flex-col my-4"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-3 rounded-t-lg flex items-center justify-between mt-[900px] md:mt-[180px] lg:mt-0">
          <h2 className="text-lg font-bold"> بررسی ۱۶۹ جدید</h2>
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
                  <option value="">انتخاب کنید</option>
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

            {/* مشتری جدید (customer select) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                مشتری جدید
              </label>
              <select
                value={invoiceData.crn}
                onChange={(e) => handleInputChange("crn", e.target.value)}
                className="w-full px-2 py-[5px] border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب کنید</option>
                {(customers || []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {(c.name || "") + (c.last_name ? " " + c.last_name : "")}
                  </option>
                ))}
              </select>
            </div>

            {/* کد شعبه خریدار (Buyer Branch Code) */}

            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                کد شعبه خریدار
              </label>
              <input
                type="text"
                value={invoiceData.bbc}
                onChange={(e) => handleInputChange("bbc", e.target.value)}
                placeholder="0"
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
                onChange={(e) => handleInputChange("setm", e.target.value)}
                className="w-full  px-2 py-[7px] border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب کنید</option>
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
                value={invoiceData.sbc}
                placeholder="4 رقم باشد"
                onChange={(e) => handleInputChange("sbc", e.target.value)}
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
                onChange={(e) => handleInputChange("comment", e.target.value)}
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
          {/* Table Header - Desktop Only */}
          <div className="hidden md:block bg-[#1A2035] text-white px-4 py-3 rounded-t-lg">
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
          <div className="rounded-b-lg min-h-[200px] max-h-[300px] overflow-y-auto">
            {lineItems.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-100">
                رکوردی وجود ندارد
              </div>
            ) : (
              <div>
                {lineItems.map((item, index) => (
                  <div key={item.id}>
                    {/* Mobile/Tablet Card View */}
                    <div
                      className={`md:hidden mb-3 p-4 rounded-lg text-white ${
                        index % 2 === 0 ? "bg-gray-600" : "bg-gray-500"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            شناسه خدمت/کالا:
                          </span>
                          <span className="text-sm font-medium">
                            {item.sstid}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            نام خدمت/کالا:
                          </span>
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            تعداد/مقدار:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(item.am)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            مبلغ واحد:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(item.fee)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            نرخ برابری ارز با ریال:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(
                              item.exchangeRate
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            میزان ارز:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(
                              item.currencyAmount
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            مبلغ تخفیف:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(item.dis)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            مبلغ بعد از تخفیف:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(item.adis)}
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 pt-2">
                          <button
                            onClick={() => handleDeleteLineItem(item.id)}
                            className="text-red-500 hover:text-red-600 p-2"
                          >
                            <MdDelete className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEditLineItem(item.id)}
                            className="text-white hover:text-green-600 p-2"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Table View */}
                    <div
                      className={`hidden md:grid grid-cols-9 gap-2 p-2 text-white ${
                        index % 2 === 0 ? "bg-gray-600" : "bg-gray-500"
                      }`}
                    >
                      <span className="px-2 py-1 text-sm text-right">
                        {item.sstid}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {item.name}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(item.am)}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(item.fee)}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(
                          item.exchangeRate
                        )}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(
                          item.currencyAmount
                        )}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(item.dis)}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(item.adis)}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Financial Summary Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مبلغ قبل از تخفیف
              </label>
              <input
                type="text"
                value={Number(totalDiscount).toLocaleString("fa-IR")}
                readOnly
                className="w-full px-3 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded bg-gray-100 text-[12px]"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م تخفیفات
              </label>
              <input
                type="text"
                value={Number(totalDiscount).toLocaleString("fa-IR")}
                readOnly
                className="w-full px-3 py-2  bg-gray-800/70 text-white/90 border border-gray-300 rounded bg-gray-100 text-[12px]"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مبلغ پس از کسر تخفیف
              </label>
              <input
                type="text"
                value={
                  totals.tadis
                    ? Number(totals.tadis).toLocaleString("fa-IR")
                    : ""
                }
                readOnly
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded bg-gray-100 text-[12px]"
              />
            </div>
            {/* <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مبلغ پرداختی نقدی
              </label>
              <input
                type="number"
                value={totals.cap}
                readOnly
                // onChange={(e) =>
                //   setTotals((prev) => ({
                //     ...prev,
                //     cap: parseFloat(e.target.value) || 0,
                //   }))
                // }
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded text-[12px]"
              />
            </div> */}
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                مبلغ سایر وجوه قانونی
              </label>
              <input
                type="text"
                value={Number(olamTotal).toLocaleString("fa-IR")}
                readOnly
                // onChange={(e) =>
                //   setTotals((prev) => ({
                //     ...prev,
                //     insp: parseFloat(e.target.value) || 0,
                //   }))
                // }
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded text-[12px]"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م مالیات بر ارزش افزوده
              </label>
              <input
                type="text"
                value={Number(tax).toLocaleString("fa-IR")}
                // onChange={(e) =>
                //   setTotals((prev) => ({
                //     ...prev,
                //     tvam: parseFloat(e.target.value) || 0,
                //   }))
                // }
                readOnly
                className="w-full px-3 bg-gray-800/70 text-white/90 py-2 border border-gray-300 rounded text-[12px]"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                م سایر مالیات
              </label>
              <input
                type="text"
                value={Number(totalOdam).toLocaleString("fa-IR")}
                // onChange={(e) =>
                //   setTotals((prev) => ({
                //     ...prev,
                //     todam: parseFloat(e.target.value) || 0,
                //   }))
                // }
                readOnly
                className="w-full px-3 py-2 bg-gray-800/70 text-white/90 border border-gray-300 rounded text-[12px]"
              />
            </div>
            <div>
              <label className="block text-gray-100 text-[10px] font-medium mb-1">
                مبلغ کل
              </label>
              <input
                type="text"
                value={
                  totalPrice ? Number(totalPrice).toLocaleString("fa-IR") : ""
                }
                readOnly
                className="w-full px-3 py-2 bg-gray-800/70 text-white/90  border border-gray-300 rounded  font-bold text-[12px]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className=" px-6 py-4 rounded-b-lg">
          <div className="flex justify-center gap-4 w-full">
            <button
              onClick={handleCancel}
              className="bg-red-500 text-sm lg:text-base w-1/3 text-white px-8 py-2 rounded-lg font-medium  hover:bg-red-600 transition-colors"
            >
              انصراف
            </button>
            <button
              onClick={handleSaveAndSend}
              className="btn-custom4 text-sm lg:text-base"
            >
              ذخیره و ارسال
            </button>
            <button
              onClick={handleSave}
              className="btn-custom4 text-sm lg:text-base"
            >
              ذخیره
            </button>
          </div>
        </div>

        {/* Add Line Item Modal */}
        <AddLineItemModalReveiw
          isOpen={addItemModalOpen}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          onClose={() => {
            setAddItemModalOpen(false);
            setEditItemId(null);
          }}
          onSave={handleSaveLineItem}
          initialData={
            editItemId
              ? (() => {
                  const item = lineItems.find((x) => x.id === editItemId);
                  return {
                    ProductId: item?.serviceName,
                    title: item?.name,
                    am: item?.am,
                    fee: item?.fee,
                    prdis: item?.prdis,
                    dis: item?.dis,
                    adis: item?.adis,
                    exr: item?.exr,
                    cfee: item?.cfee,
                    cut: item?.cut,
                    Show: item?.Show || false,
                    bsrn: item?.bsrn,
                    comment: item?.comment,
                    vra: item?.vra,
                    vam: item?.vam,
                    odam: item?.odam,
                    olam: item?.olam,
                    cop: item?.cop,
                    vop: item?.vop,
                    tsstam: item?.tsstam,
                  };
                })()
              : null
          }
          title={editItemId ? "ویرایش" : "جدید"}
        />
      </div>
    </div>
  );
}

CreateModalReview.propTypes = {
  isOpen2: PropTypes.bool.isRequired,
  onClose2: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
};
