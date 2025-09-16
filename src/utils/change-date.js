import { DateObject } from "react-multi-date-picker";
import gregorian from 'react-date-object/calendars/gregorian';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";



const changeDate = (dateString) => {
    let parts = dateString.split(" ");

    let datePart = parts[0];
    let timePart = parts[1];

    return { datePart, timePart };
};


const formatDate = (dateFrom, dateTo) => {

    let formattedDateFrom = dateFrom;
    let formattedDateTo = dateTo;
  
    if (dateFrom instanceof DateObject) {
      formattedDateFrom = persianToEnglishNumber(dateFrom.convert(gregorian).format('YYYY-MM-DD'));
    }
    if (dateTo instanceof DateObject) {
      formattedDateTo = persianToEnglishNumber(dateTo.convert(gregorian).format('YYYY-MM-DD'));
    }
  
    return { formattedDateFrom, formattedDateTo }
  };


  
  const persianToEnglishNumber = (persianNumber) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return persianNumber.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);
  };

  const formatDateToYMD = (dateString) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // در صورت خطا، تاریخ اصلی برگردانده شود
    }
  };

  /**
 * تبدیل تاریخ میلادی به شمسی با فرمت فارسی
 * @param {string} dateString - رشته تاریخ میلادی (مثال: "2025-09-16T15:27:10+03:30")
 * @returns {string} تاریخ شمسی به صورت رشته فارسی (مثال: "۲۵ شهریور ۱۴۰۴")
 */
const convertToPersianDate = (dateString) => {
  try {
    // ایجاد یک شیء Date از رشته ورودی
    const date = new Date(dateString);
    
    // بررسی معتبر بودن تاریخ
    if (isNaN(date.getTime())) {
      throw new Error("تاریخ نامعتبر است");
    }
    
    // تبدیل به تاریخ شمسی با استفاده از react-multi-date-picker
    const persianDate = new DateObject({
      date: date,
      calendar: persian,
      locale: persian_fa
    });
    
    // فرمت‌دهی به صورت "day month year" فقط با روز، ماه و سال
    return persianDate.format("DD MMMM YYYY");
  } catch (error) {
    console.error("خطا در تبدیل تاریخ:", error);
    return "تاریخ نامعتبر";
  }
};

/**
 * استخراج ساعت از رشته تاریخ به فرمت فارسی
 * @param {string} dateString - رشته تاریخ میلادی (مثال: "2025-09-16T15:27:10+03:30")
 * @returns {string} ساعت به صورت رشته فارسی (مثال: "۱۵:۲۷")
 */
const extractTimeFromDate = (dateString) => {
  try {
    // ایجاد یک شیء Date از رشته ورودی
    const date = new Date(dateString);
    
    // بررسی معتبر بودن تاریخ
    if (isNaN(date.getTime())) {
      throw new Error("تاریخ نامعتبر است");
    }
    
    // استخراج ساعت و دقیقه
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // تبدیل اعداد انگلیسی به فارسی
    const persianHours = hours.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    const persianMinutes = minutes.toString().padStart(2, '0').replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    
    // بازگرداندن زمان به فرمت ساعت:دقیقه
    return `${persianHours}:${persianMinutes}`;
  } catch (error) {
    console.error("خطا در استخراج زمان:", error);
    return "زمان نامعتبر";
  }
};


  export {formatDateToYMD , persianToEnglishNumber , formatDate , changeDate ,convertToPersianDate , extractTimeFromDate}