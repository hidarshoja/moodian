import ServicesTable from "../components/ServicesTable";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GrDocumentExcel } from "react-icons/gr";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">کالا و خدمات</h1>
          <div className="flex  items-center justify-between mt-1">
            <p className="text-white/60 text-sm">نمای کلی کالا و خدمات </p>
            <div className="flex gap-3">
              {/* جدید */}
              <button className="btn-custom">
                جدید
                <span className="inline-block">
                 <HiOutlinePlusSm className="w-5 h-5"/>
                </span>
              </button>
              {/* از اکسل */}
              <button className="btn-custom">
                از اکسل
                <span className="inline-block">
                 <GrDocumentExcel className="w-5 h-5"/>
                </span>
              </button>
              {/* به اکسل */}
              <button className="btn-custom">
                به اکسل
                <span className="inline-block">
                <GrDocumentExcel className="w-5 h-5"/>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto p-6">
        <ServicesTable />
      </div>
    </div>
  );
}
