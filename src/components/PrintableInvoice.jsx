import React from "react";

const PrintableInvoice = ({ invoiceData, lineItems, customer }) => {
  const user = JSON.parse(localStorage.getItem("USER"));
console.log(`user`, user);

  const getIntyText = (value) => {
    switch (value) {
      case "1":
        return "نوع اول";
      case "2":
        return "نوع دوم";
      case "3":
        return "نوع سوم";
      default:
        return "";
    }
  };
console.log(`invoiceData`, invoiceData);
console.log(`lineItems`, lineItems);
console.log(`customer`, customer);
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
        return "";
    }
  };

  const getSetmText = (value) => {
    switch (value) {
      case "1":
        return "نقدی";
      case "2":
        return "نسیه";
      case "3":
        return "نسیه/نقدی";
      default:
        return "";
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleDateString("fa-IR");
    } catch {
      return "";
    }
  };

  const totalAfterDiscount = lineItems?.reduce(
    (sum, item) => sum + (Number(item.adis) || 0),
    0
  );

  return (
    <div className="invoice-a4">
      <div className="invoice-header-row">
        <div className="invoice-header-title">
          صورتحساب فروش كالا و خدمات
        </div>
        <div className="invoice-header-meta">
          <div className="invoice-header-cell">
            <span>تاريخ</span>
            <span className="text-black">{formatDate(invoiceData?.indatim)}</span>
          </div>
          <div className="invoice-header-cell">
            <span>شماره فاكتور</span>
            <span className="text-black">{invoiceData?.irtaxid || ""}</span>
          </div>
        </div>
      </div>

      {/* مشخصات فروشنده */}
      <div className="party-section">
        <div className="party-title">مشخصات فروشنده</div>
        <div className="party-grid">
          <div className="party-cell">
            <span>نام شخص حقيقی / حقوقی</span>
            <span className="text-black">{user?.name} {user?.last_name }</span>
          </div>
          <div className="party-cell">
            <span>شماره اقتصادی</span>
            <span className="text-black">{user?.tins   }</span>
          </div>
          <div className="party-cell">
            <span>شماره ملی / شناسه ملی</span>
            <span className="text-black">{user?.national_id}</span>
          </div>
          <div className="party-cell">
            <span>وضعیت</span>
            <span className="text-black">{user?.status_label }</span>
          </div>
          <div className="party-cell party-cell-wide">
            <span>نشانی کامل</span>
            <span className="text-black">{user?.address }</span>
          </div>
          <div className="party-cell">
            <span>کد پستی</span>
            <span className="text-black">{user?.postal_code }</span>
          </div>
          <div className="party-cell">
            <span>تلفن</span>
            <span className="text-black">{user?.mobile }</span>
          </div>
        </div>
      </div>

      {/* مشخصات خریدار */}
      <div className="party-section">
        <div className="party-title">مشخصات خریدار</div>
        <div className="party-grid">
          <div className="party-cell">
            <span>نام شخص حقیقی / حقوقی</span>
            <span className="text-black">{customer?.name} {customer?.last_name}</span>
          </div>
          <div className="party-cell">
            <span>شماره اقتصادی</span>
            <span className="text-black">{customer?.economic_code || ""}</span>
          </div>
          <div className="party-cell">
            <span>شماره ملی / شناسه ملی</span>
            <span className="text-black">{customer?.national_code || ""}</span>
          </div>
          <div className="party-cell">
            <span> کد شعبه </span>
            <span className="text-black">{customer?.branch_code || ""}</span>
          </div>
          <div className="party-cell party-cell-wide">
            <span>نشانی کامل</span>
            <span className="text-black">{customer.address} بجنورد</span>
          </div>
          <div className="party-cell">
            <span>کد پستی</span>
            <span className="text-black">{customer.postal_code || ""}</span>
          </div>
          <div className="party-cell">
            <span>تلفن</span>
            <span className="text-black">{customer?.tel || ""}</span>
          </div>
        </div>
      </div>

      {/* اطلاعات عمومی فاکتور (نوع، الگو، روش تسویه و ... ) */}
      <div className="meta-section">
        <div className="meta-cell">
          <span>نوع صورتحساب</span>
          <span>{getIntyText(invoiceData.inty)}</span>
        </div>
        <div className="meta-cell">
          <span>الگوی صورتحساب</span>
          <span>{getInpText(invoiceData.inp)}</span>
        </div>
        <div className="meta-cell">
          <span>روش تسویه</span>
          <span>{getSetmText(invoiceData.setm)}</span>
        </div>
        <div className="meta-cell">
          <span>شماره فاکتور در سامانه مشتری</span>
          <span>{invoiceData.MyInvoiceId || ""}</span>
        </div>
      </div>

      {/* جدول اقلام */}
      <table className="items-table">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>کد کالا یا خدمات</th>
            <th>شرح كالا يا خدمات</th>
            <th>تعداد / مقدار</th>
            <th>واحد اندازه‌گيری</th>
            <th>مبلغ واحد (ريال)</th>
            <th>مبلغ كل (ريال)</th>
            <th>مبلغ تخفيف (ريال)</th>
            <th>مبلغ كل پس از تخفيف (ريال)</th>
          </tr>
        </thead>
        <tbody>
          {lineItems?.map((item, index) => {
            const amount = Number(item.am) || 0;
            const fee = Number(item.fee) || 0;
            const total = amount * fee;
            const discount = Number(item.prdis) || 0;
            const afterDiscount = total - discount;

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.serviceId ?? ""}</td>
                <td>{item.serviceName ?? ""}</td>
                <td>{amount}</td>
                <td>{item.unit || ""}</td>
                <td>{fee.toLocaleString("fa-IR")}</td>
                <td>{total.toLocaleString("fa-IR")}</td>
                <td>{discount.toLocaleString("fa-IR")}</td>
                <td>{afterDiscount.toLocaleString("fa-IR")}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={8} className="items-table-footer-label">
              جمع كل پس از تخفيف
            </td>
            <td className="items-table-footer-value">
              {Number(totalAfterDiscount || 0).toLocaleString("fa-IR")}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="footer-row">
        <div className="footer-notes">
          <div>توضيحات:</div>
          <div>{invoiceData.comment || ""}</div>
        </div>
        <div className="footer-sign">
          <div>مهر و امضای فروشنده</div>
        </div>
        <div className="footer-sign">
          <div>مهر و امضای خریدار</div>
        </div>
      </div>
    </div>
  );
};

export default PrintableInvoice;


