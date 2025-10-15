import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

/**
 * تبدیل ارقام فارسی/عربی به انگلیسی
 */
const normalizeDigits = (s) => {
  if (typeof s !== "string") return s;
  const map = {
    "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
    "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
    "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
    "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
  };
  return s.replace(/[۰-۹٠-٩]/g, (ch) => map[ch] ?? ch);
};

/**
 * تبدیل تاریخ شمسی یا timestamp به میلادی با فرمت YYYY-MM-DD HH:mm:ss
 */
export default function persianToGregorianString(value) {
  try {
    if (!value) return null;

    let output = "";

    // timestamp یا عدد
    if (typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value))) {
      const ts = Number(value);
      output = new DateObject({ date: new Date(ts), calendar: gregorian })
        .setLocale("en")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    // Date معمولی
    else if (value instanceof Date) {
      output = new DateObject({ date: value, calendar: gregorian })
        .setLocale("en")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    // DateObject از react-date-object
    else if (value && typeof value === "object" && typeof value.format === "function" && value.calendar) {
      output = value.convert(gregorian).setLocale("en").format("YYYY-MM-DD HH:mm:ss");
    }

    // رشته شمسی
    else if (typeof value === "string") {
      let s = normalizeDigits(value.trim());
      s = s.replace(/[\/\\٫،]/g, "-").replace(/\u200c/g, " ");
      if (!/\d{1,2}:\d{1,2}:\d{1,2}/.test(s)) s += " 00:00:00";

      const persianDate = new DateObject({
        date: s,
        calendar: persian,
        locale: persian_fa,
      });

      output = persianDate.convert(gregorian).setLocale("en").format("YYYY-MM-DD HH:mm:ss");
    }

    // اطمینان از انگلیسی بودن ارقام خروجی
    return normalizeDigits(output);
  } catch (err) {
    console.error("persianToGregorianString error:", err);
    return value;
  }
}
