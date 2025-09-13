import ServicesTable from "../components/ServicesTable";

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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="4"
                      fill="#e0f2f1"
                    />
                    <path
                      d="M12 8v8M8 12h8"
                      stroke="#26a69a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              {/* از اکسل */}
              <button className="btn-custom">
                از اکسل
                <span className="inline-block">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="4"
                      fill="#e0f2f1"
                    />
                    <text
                      x="7"
                      y="17"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#26a69a"
                    >
                      X
                    </text>
                  </svg>
                </span>
              </button>
              {/* به اکسل */}
              <button className="btn-custom">
                به اکسل
                <span className="inline-block">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="4"
                      fill="#e0f2f1"
                    />
                    <text
                      x="7"
                      y="17"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#26a69a"
                    >
                      X
                    </text>
                  </svg>
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
