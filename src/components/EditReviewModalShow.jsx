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
import axiosClient from "../axios-client";
import { convertJalaliDatetimeToGregorian } from "../utils/change-date";

export default function EditReviewModalShow({ isOpen, onClose, invoiceData  , customers , products }) {
  const [formData, setFormData] = useState({
    id: "",
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
  const [loadingItems, setLoadingItems] = useState(false);
  const [totalDiscount2 , setTotalDiscount2] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalDiscount3 , setTotalDiscount3] = useState(0);
  const[tax , setTax] = useState(0);
  const[totalOdam, setTotalOdam] = useState(0);
  const [olamTotal, setOlamTotal] = useState(0);
  const[totalPrice , setTotalPrice] = useState(0);

  // Initialize form data when invoiceData changes
  useEffect(() => {
    if (invoiceData && isOpen) {
      setFormData({
        id: invoiceData.id || "",
        inty: invoiceData.inty || "1",
        inp: invoiceData.inp || "",
        indatim: invoiceData.indatim
          ? new Date(invoiceData.indatim)
          : new Date(),
        indati2m: invoiceData.indati2m
          ? new Date(invoiceData.indati2m)
          : new Date(),
        comment: invoiceData.comment || "",
        crn: invoiceData.customer?.id || "",
        bbc: invoiceData.bbc || "",
        setm: invoiceData.setm || "نقدی",
        MyInvoiceId: invoiceData.MyInvoiceId || "",
        sbc: invoiceData.sbc || "",
      });

      // Fetch line items from API
      if (invoiceData.id) {
        setLoadingItems(true);
        axiosClient
        .get(`/invoice/${invoiceData.id}/items`)
          .then((response) => {
         
            setLineItems(response.data.data);
         
          })
          .catch((error) => {
            console.error("Error fetching line items:", error);
            // Fallback to existing items if API fails
            if (invoiceData.items && Array.isArray(invoiceData.items)) {
              const formattedItems = invoiceData.items.map((item, index) => ({
                id: Date.now() + index,
                serviceId: item.product_id || "",
                serviceName: item.product_id || "",
                am: item.am || 0,
                fee: item.fee || 0,
                exchangeRate: item.exr || 0,
                currencyAmount: item.cfee || 0,
                prdis: item.dis || 0,
                dis: item.dis || 0,
                adis: item.am * item.fee - (item.dis || 0),
              }));
              setLineItems(formattedItems);
            }
          })
          .finally(() => {
            setLoadingItems(false);
          });
      }
    }
  }, [invoiceData, isOpen]);

  const toNumberOrNull = (val) => {
    if (val === undefined || val === null || val === "") return null;
    const n = Number(val);
    return Number.isNaN(n) ? null : n;
  };

  const formatDateTime = (date) => {
    if (!date) return null;
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (Number.isNaN(d.getTime())) return null;

      // Format as YYYY-MM-DD HH:MM:SS
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const seconds = String(d.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch {
      return null;
    }
  };

  const buildPayload = () => {
    const payload = {
      id: formData.id,
      customer_id: toNumberOrNull(formData.crn) ?? null,
      inty: toNumberOrNull(formData.inty),
      irtaxid: null,
      indatim: convertJalaliDatetimeToGregorian(
        formatDateTime(formData.indatim)
      ),
      indati2m: convertJalaliDatetimeToGregorian(
        formatDateTime(formData.indati2m)
      ),
      inp: toNumberOrNull(formData.inp),
      ins: 1,
      sbc: formData.sbc?.trim() || null,
      ft: null,
      scln: null,
      scc: null,
      crn: null,
      cdcn: null,
      cdcd: null,
      billid: null,
      setm: toNumberOrNull(formData.setm),
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
      sg: null,
      asn: null,
      asd: null,
      in: null,
      an: null,
      items: (lineItems || []).map((it) => ({
        product_id: toNumberOrNull(it.product_id),
        am: toNumberOrNull(it.am),
        nw: null,
        fee: toNumberOrNull(it.fee),
        cfee: toNumberOrNull(it.cfee),
        cut: null,
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Recalculate derived totals whenever line items change
  useEffect(() => {
    const calculatedTotals = lineItems.reduce(
      (acc, item) => {
        const itemTotal = (item.am || 0) * (item.fee || 0);
        acc.tprdis += itemTotal;
        acc.tdis += item.dis || 0;
        acc.tadis += itemTotal - (item.dis || 0);
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
    
    const sumDiscount = lineItems?.reduce((sum, item) => sum + ((item?.am * item?.fee) || 0), 0);
    const sumDiscount2 = lineItems?.reduce((sum, item) => sum + (item?.dis || 0), 0);
    const sumTax = lineItems?.reduce((sum, item) => sum + (item?.vam || 0), 0);
    const sumOdam = lineItems?.reduce((sum, item) => sum + (item?.odam || 0), 0);
    const sumOlam = lineItems?.reduce((sum, item) => sum + (item?.olam || 0), 0);

   
    setOlamTotal(sumOlam);
    setTotalPrice((totalDiscount3 + olamTotal + tax + totalOdam));
    setTotalDiscount(sumDiscount);
    setTotalDiscount2(sumDiscount2);
    setTotalDiscount3(sumDiscount - sumDiscount2);
    setTax(sumTax);
    setTotalOdam(sumOdam);
  }, [lineItems]);

  if (!isOpen) return null;

  const handleAddLineItem = () => {
    setEditItemId(null);
    setAddItemModalOpen(true);
  };

  const handleSaveLineItem = (itemData) => {
    // Calculate adis if not provided
    const calculatedAdis =
      itemData.adis ||
      (itemData.am || 0) * (itemData.fee || 0) - (itemData.dis || 0);

    if (editItemId) {
      setLineItems((prev) =>
        prev.map((item) =>
          item.id === editItemId
            ? {
                ...item,
                product_id: itemData.ProductId,
                am: itemData.am,
                fee: itemData.fee,
                dis: itemData.dis,
                adis: calculatedAdis,
                exr: itemData.exr || item.exr || 0,
                cfee: itemData.cfee || item.cfee || 0,
                bsrn: itemData.bsrn || "",
                comment: itemData.comment || "",
                vra: itemData.vra || 0,
                vam: itemData.vam || 0,
                odam: itemData.odam || 0,
                olam: itemData.olam || 0,
                cop: itemData.cop || 0,
                vop: itemData.vop || 0,
                tsstam: itemData.tsstam || 0,
                Show: itemData.Show || false,
                // Update product info if available
                product: itemData.ProductId
                  ? {
                      sstid: itemData.ProductId,
                      title:
                        products.find((p) => p.id == itemData.ProductId)
                          ?.title || "",
                      ...item.product,
                    }
                  : item.product,
              }
            : item
        )
      );
      setEditItemId(null);
    } else {
      const newItem = {
        id: Date.now(),
        product_id: itemData.ProductId,
        am: itemData.am,
        fee: itemData.fee,
        exr: itemData.exr || 0,
        cfee: itemData.cfee || 0,
        dis: itemData.dis,
        adis: calculatedAdis,
        bsrn: itemData.bsrn || "",
        comment: itemData.comment || "",
        vra: itemData.vra || 0,
        vam: itemData.vam || 0,
        odam: itemData.odam || 0,
        olam: itemData.olam || 0,
        cop: itemData.cop || 0,
        vop: itemData.vop || 0,
        tsstam: itemData.tsstam || 0,
        Show: itemData.Show || false,
        product: itemData.ProductId
          ? {
              sstid: itemData.ProductId,
              title:
                products.find((p) => p.id == itemData.ProductId)?.title || "",
            }
          : null,
      };
      setLineItems((prev) => [...prev, newItem]);
    }
    calculateTotals();
  };

  const handleDeleteLineItem = (id) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
    calculateTotals();
  };

  const handleEditLineItem = (item) => {
    setEditItemId(item?.id);
    setAddItemModalOpen(true);
  };

  const calculateTotals = () => {
    // Calculate totals based on line items
    const calculatedTotals = lineItems.reduce(
      (acc, item) => {
        const itemTotal = (item.am || 0) * (item.fee || 0);
        acc.tprdis += itemTotal;
        acc.tdis += item.dis || 0;
        acc.tadis += itemTotal - (item.dis || 0);
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
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = buildPayload();
   

    try {
      const res = await axiosClient.put(`/invoices/${formData.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Success message
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "فاکتور فروش با موفقیت ویرایش شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
  

      // Refresh the data after successful save
      if (invoiceData.id) {
        setLoadingItems(true);
        axiosClient
            .get(`/invoice/${invoiceData.id}/items`)
          .then((response) => {
           
            setLineItems(response.data.data);
          })
          .catch((error) => {
            console.error("Error refreshing line items:", error);
          })
          .finally(() => {
            setLoadingItems(false);
          });
      }

      onClose();
    } catch (error) {
      console.error("خطا در ویرایش فاکتور:", error);
      let errorMessage = "خطا در ویرایش فاکتور";

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

    try {
      // First, save the invoice
      const payload = buildPayload();
     

      const saveRes = await axiosClient.put(
        `/invoices/${formData.id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      

      // Then, send to moadian
      const sendData = {
        ids: [formData.id.toString()],
      };
     

      const sendRes = await axiosClient.post(
        `/invoices/send-to-moadian`,
        sendData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "صورتحساب ویرایش و ارسال شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: { popup: "swal2-toast" },
      });
    

      // Refresh the data after successful save and send
      if (invoiceData.id) {
        setLoadingItems(true);
        axiosClient
             .get(`/invoice/${invoiceData.id}/items`)
          .then((response) => {
      
            setLineItems(response.data.data);
          })
          .catch((error) => {
            console.error("Error refreshing line items:", error);
          })
          .finally(() => {
            setLoadingItems(false);
          });
      }

      onClose();
    } catch (error) {
      console.error("خطا در ویرایش و ارسال:", error);
      let errorMessage = "خطا در ویرایش و ارسال";
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
    onClose();
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
    const selectedCustomer = customers.find((c) => c.id == formData.crn);
    const customerName = selectedCustomer
      ? (selectedCustomer.name || "") +
        (selectedCustomer.last_name ? " " + selectedCustomer.last_name : "")
      : "انتخاب نشده";

    // Get inty text
    const getIntyText = (value) => {
      switch (value) {
        case "1":
          return "نوع اول";
        case "2":
          return "نوع دوم";
        case "3":
          return "نوع سوم";
        default:
          return "نامشخص";
      }
    };

    // Get inp text
    const getInpText = (value) => {
      switch (value) {
        case "1":
          return "الگوی اول (فروش)";
        case "2":
          return "الگوی دوم (فروش ارزی)";
        case "3":
          return "الگوی سوم (صورتحساب طلا، جواهر و پلاتین)";
        case "4":
          return "الگوی چهارم (قرارداد پیمانکاری)";
        case "5":
          return "الگوی پنجم (قبوض خدماتی)";
        case "6":
          return "الگوی ششم (بلیط هواپیما)";
        case "7":
          return "الگوی هفتم (صادرات)";
        case "8":
          return "الگوی هشتم (بارنامه)";
        case "11":
          return "الگوی یازدهم (بورس اوراق بهادار مبتنی بر کالا)";
        case "13":
          return "الگوی سیزدهم (فروش خدمات بیمهای)";
        default:
          return "انتخاب نشده";
      }
    };

    // Get setm text
    const getSetmText = (value) => {
      switch (value) {
        case "1":
          return "نقدی";
        case "2":
          return "نسیه";
        case "3":
          return "نسیه/نقدی";
        default:
          return "نامشخص";
      }
    };

    // Format date
    const formatDateForPrint = (date) => {
      if (!date) return "نامشخص";
      try {
        const d = date instanceof Date ? date : new Date(date);
        if (Number.isNaN(d.getTime())) return "نامشخص";
        return d.toLocaleDateString("fa-IR");
      } catch {
        return "نامشخص";
      }
    };

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
            h1 { font-size: 18px; margin-bottom: 16px; text-align: center; }
            .invoice-info { margin-bottom: 20px; }
            .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .info-table td { padding: 8px; font-size: 12px; border: 1px solid #ddd; }
            .info-table .label { background: #f5f5f5; font-weight: bold; width: 30%; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #999; padding: 8px; font-size: 12px; text-align: center; }
            thead { background: #f0f0f0; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>فاکتور فروش</h1>
          
          <div class="invoice-info">
            <table class="info-table">
              <tr>
                <td class="label">نوع:</td>
                <td>${getIntyText(formData.inty)}</td>
                <td class="label">الگوی فروش:</td>
                <td>${getInpText(formData.inp)}</td>
              </tr>
              <tr>
                <td class="label">تاریخ صدور:</td>
                <td>${formatDateForPrint(formData.indatim)}</td>
                <td class="label">تاریخ ایجاد:</td>
                <td>${formatDateForPrint(formData.indati2m)}</td>
              </tr>
              <tr>
                <td class="label">مشتری:</td>
                <td>${customerName}</td>
                <td class="label">کد شعبه خریدار:</td>
                <td>${formData.bbc || "نامشخص"}</td>
              </tr>
              <tr>
                <td class="label">روش تسویه:</td>
                <td>${getSetmText(formData.setm)}</td>
                <td class="label">کد شعبه فروشنده:</td>
                <td>${formData.sbc || "نامشخص"}</td>
              </tr>
              <tr>
                <td class="label">ش ف در سامانه مشتری:</td>
                <td>${formData.MyInvoiceId || "نامشخص"}</td>
                <td class="label">توضیحات:</td>
                <td>${formData.comment || "ندارد"}</td>
              </tr>
            </table>
          </div>

          <h2>جدول اقلام فاکتور</h2>
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
        <div className="bg-[#1A2035] text-white px-6 py-3 rounded-t-lg flex items-center justify-between mt-[930px] md:mt-[180px] lg:mt-0">
        نمایش بررسی ۱۶۹
          <div className="text-sm">تاریخ مجاز ارسال از : ۱۴۰۴/۰۷/۰۸</div>
          <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div>
              <span className="text-sm">
                {invoiceData?.taxid}{" "}
                {invoiceData?.ancestors && invoiceData?.ancestors.length > 0
                  ? invoiceData.ancestors
                      .map((ancestor) => `:: [${ancestor?.taxid}]`)
                      .filter(Boolean)
                      .join(" , ")
                  : ""}
              </span>
            </div>
            <SlPrinter onClick={handlePrint} className="cursor-pointer" />
            <button
              onClick={handleCancel}
              className="text-white/80 hover:text-white p-1"
            >
              <MdClose className="w-4 h-4" />
            </button>
          </div>
          
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
                  value={formData.inty}
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
                  value={formData.inp}
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
                value={formData.indatim}
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
                value={formData.indati2m}
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
                value={formData.crn}
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
                value={formData.bbc}
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
                value={formData.setm}
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
                value={formData.sbc}
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
                value={formData.MyInvoiceId}
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
                value={formData.comment}
                onChange={(e) => handleInputChange("comment", e.target.value)}
                className="w-full px-4 py-2 border bg-gray-800/70 text-white/90 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

      

     
         {/* Line Items Section */}
         <div className="flex-1  px-6 pb-4">
          {/* Table Header - Desktop Only */}
          <div className="hidden md:block bg-[#1A2035] text-white px-4 py-3 rounded-t-lg">
            <div className="grid grid-cols-8 gap-2 text-sm font-medium text-right">
              <div>شناسه خدمت/کالا</div>
              <div>نام خدمت/کالا</div>
              <div>تعداد/مقدار</div>
              <div>مبلغ واحد</div>
              <div>نرخ برابری ارز با ریال</div>
              <div>میزان ارز</div>
              <div>مبلغ تخفیف</div>
              <div>مبلغ بعد از تخفیف</div>
              {/* <div className="text-center">عملیات</div> */}
            </div>
          </div>

          {/* Table Content */}
          <div className=" rounded-b-lg min-h-[200px] max-h-[300px] overflow-y-auto">
            {loadingItems ? (
              <div className="flex items-center justify-center h-32 text-gray-100">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  در حال بارگذاری اقلام...
                </div>
              </div>
            ) : lineItems.length === 0 ? (
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
                        index % 2 === 0
                          ? "bg-gray-600 hover:bg-gray-700"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            شناسه خدمت/کالا:
                          </span>
                          <span className="text-sm font-medium">
                            {item?.product?.sstid || item?.product_id}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            نام خدمت/کالا:
                          </span>
                          <span className="text-sm font-medium">
                            {item?.product?.title || ""}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            تعداد/مقدار:
                          </span>
                          <span className="text-sm font-medium">
                            {item.am || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            مبلغ واحد:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(
                              item?.fee || 0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            نرخ برابری ارز با ریال:
                          </span>
                          <span className="text-sm font-medium">
                            {item?.exr || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            میزان ارز:
                          </span>
                          <span className="text-sm font-medium">
                            {item?.cfee || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            مبلغ تخفیف:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(
                              item?.dis || 0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-xs text-white/70">
                            مبلغ بعد از تخفیف:
                          </span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat("fa-IR").format(
                              item?.adis || 0
                            )}
                          </span>
                        </div>
                        {/* <div className="flex items-center justify-center gap-3 pt-2">
                          <button
                            onClick={() => handleDeleteLineItem(item.id)}
                            className="text-red-500 hover:text-red-600 p-2"
                          >
                            <MdDelete className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEditLineItem(item)}
                            className="text-white hover:text-green-600 p-2"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                        </div> */}
                      </div>
                    </div>

                    {/* Desktop Table View */}
                    <div
                      className={`hidden md:grid grid-cols-8 gap-2 p-2 text-white ${
                        index % 2 === 0 ? "bg-gray-600" : "bg-gray-500"
                      }`}
                    >
                      <span className="px-2 py-1 text-sm text-right">
                        {item?.product?.sstid || item?.product_id}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {item?.product?.title || ""}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {item.am || 0}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(item?.fee || 0)}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {item?.exr || 0}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {item?.cfee || 0}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(item?.dis || 0)}
                      </span>
                      <span className="px-2 py-1 text-sm text-right">
                        {new Intl.NumberFormat("fa-IR").format(item?.adis || 0)}
                      </span>
                      {/* <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleDeleteLineItem(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditLineItem(item)}
                          className="text-white hover:text-green-600"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                      </div> */}
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
                  value={Number(totalDiscount2).toLocaleString("fa-IR")}
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
                value={Number(totalDiscount3).toLocaleString("fa-IR")}
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
              value={totalPrice ? Number(totalPrice).toLocaleString("fa-IR") : ""}
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
              className="bg-red-500 w-full text-white px-8 py-3 rounded-lg font-medium  hover:bg-red-600 transition-colors"
            >
              انصراف
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
              ? (() => {
                  const item = lineItems.find((x) => x.id === editItemId);
                  if (!item) return null;

                  const prdis = (item.am || 0) * (item.fee || 0);
                  const adis = prdis - (item.dis || 0);

                  return {
                    ProductId: item.product_id,
                    title: item?.product?.title,
                    am: item.am,
                    fee: item.fee,
                    prdis: prdis,
                    dis: item.dis,
                    adis: adis,
                    bsrn: item.bsrn || "",
                    comment: item.comment || "",
                    vra: item.vra || 0,
                    vam: item.vam || 0,
                    odam: item.odam || 0,
                    olam: item.olam || 0,
                    cop: item.cop || 0,
                    vop: item.vop || 0,
                    tsstam: item.tsstam || 0,
                    Show: item.Show || false,
                    exr: item.exr || 0,
                    cfee: item.cfee || 0,
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

EditReviewModalShow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoiceData: PropTypes.object,
  isEditing :PropTypes.bool.isRequired,
    customers: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
};
