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


// تبدیل ارقام فارسی -> انگلیسی
function persianDigitsToEnglish(s) {
  const persian = '۰۱۲۳۴۵۶۷۸۹';
  let out = '';
  for (let ch of s) {
    const idx = persian.indexOf(ch);
    out += idx === -1 ? ch : String(idx);
  }
  return out;
}

// تبدیل تاریخ جلالی (Jalali) به میلادی (Gregorian)
// الگوریتم برگرفته از تبدیل‌های مرسوم (Roozbeh Pournader / Behdad Esfahbod style)
function jalaliToGregorian(jy, jm, jd) {
  jy = jy - 979;
  jm = jm - 1;
  jd = jd - 1;

  let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
  for (let i = 0; i < jm; ++i) j_day_no += (i < 6) ? 31 : 30;
  j_day_no += jd;

  let g_day_no = j_day_no + 79;
  let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
  g_day_no = g_day_no % 146097;

  let leap = true;
  if (g_day_no >= 36525) {
    g_day_no -= 1;
    gy += 100 * Math.floor(g_day_no / 36524);
    g_day_no = g_day_no % 36524;
    if (g_day_no >= 365) g_day_no += 1;
    else leap = false;
  }

  gy += 4 * Math.floor(g_day_no / 1461);
  g_day_no = g_day_no % 1461;

  if (g_day_no >= 366) {
    leap = false;
    g_day_no -= 366;
    gy += Math.floor(g_day_no / 365);
    g_day_no = g_day_no % 365;
  }

  const gd_month_days = [31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gm = 0;
  while (g_day_no >= gd_month_days[gm]) {
    g_day_no -= gd_month_days[gm];
    gm++;
  }
  const gd = g_day_no + 1;
  return { year: gy, month: gm + 1, day: gd };
}

// تابع اصلی: ورودی "۱۴۰۴-۰۶-۰۱ ۱۳:۳۰:۴۱" یا با ارقام انگلیسی
function convertJalaliDatetimeToGregorian(input) {
  // جدا کردن تاریخ و ساعت
  input = input.trim();
  // تبدیل ارقام فارسی به انگلیسی در کل رشته
  const eng = persianDigitsToEnglish(input);

  // فرض قالب: YYYY-MM-DD HH:MM:SS (با یا بدون صفر پیشرو)
  const parts = eng.split(' ');
  if (parts.length < 1) throw new Error('قالب ورودی نادرست است.');

  const dateParts = parts[0].split('-').map(x => parseInt(x, 10));
  const timeParts = (parts[1] ? parts[1] : '00:00:00').split(':').map(x => parseInt(x, 10));

  const [jy, jm, jd] = dateParts;
  const { year: gy, month: gm, day: gd } = jalaliToGregorian(jy, jm, jd);

  // ساخت رشته خروجی با صفر پیشرو
  const pad2 = n => String(n).padStart(2, '0');
  const dateStr = `${gy}-${pad2(gm)}-${pad2(gd)}`;
  const timeStr = `${pad2(timeParts[0]||0)}:${pad2(timeParts[1]||0)}:${pad2(timeParts[2]||0)}`;

  return `${dateStr} ${timeStr}`;
}

// مثال:
console.log(convertJalaliDatetimeToGregorian('۱۴۰۴-۰۶-۰۱ ۱۳:۳۰:۴۱'));
// خروجی: "2024-08-23 13:30:41"




  export {formatDateToYMD , persianToEnglishNumber , formatDate , changeDate ,convertToPersianDate , extractTimeFromDate , convertJalaliDatetimeToGregorian}