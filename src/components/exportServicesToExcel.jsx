
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportServicesToExcel(dataTable) {
  const data = dataTable.map(item => ({
    "کد": item.code,
    "نام": item.name,
    "واحد": item.unit,
    "نرخ ارزش افزوده": item.valueAdded,
    "مالیات و عوارض": item.otherTax,
    "مقدار وجوه قانونی": item.legalValue,
    "نرخ سایر وجوه قانونی": item.legalRate,
    "کد کالا در سامانه مشتری": item.customCode,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Services");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "services.xlsx");
}

export function exportCustomersToExcel(dataTable) {
  const data = dataTable.map(item => ({
    "نوع مشتری": item.typeCustomer,
    "نام": item.name,
    "کد": item.code,
   "کدملی/شناسه": item.nationalCode,
   "کدپستی": item.postCode,
    "شماره تماس": item.phone,
   "کدمشتری": item.userCode,
    "آدرس": item?.address,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Services");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "services.xlsx");
}