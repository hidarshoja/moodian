import { useEffect, useRef, useState } from "react";

export default function DigitalSignatureModal({ isOpen, onClose, onSubmit }) {
  const [signatureType, setSignatureType] = useState("private");
  const [economicCode, setEconomicCode] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [persianName, setPersianName] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setSignatureType("private");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: signatureType,
      economicCode: economicCode.trim(),
      englishName: englishName.trim(),
      persianName: persianName.trim(),
    };
    onSubmit?.(payload);
  };

  return (
    <div
      ref={dialogRef}
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
    >
      <div className="w-full max-w-md rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl overflow-hidden relative animate-slideIn">
        <div className="bg-[#0a0a22] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-semibold">فرم ایجاد امضاء دیجیتال</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="flex items-center gap-6 mb-6 text-white">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                className="form-radio text-rose-500"
                name="signatureType"
                checked={signatureType === "public"}
                onChange={() => setSignatureType("public")}
              />
              <span>دولتی</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                className="form-radio text-rose-500"
                name="signatureType"
                checked={signatureType === "private"}
                onChange={() => setSignatureType("private")}
              />
              <span>خصوصی</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-white text-sm">
                کد اقتصادی
              </label>
              <input
                type="text"
                value={economicCode}
                onChange={(e) => setEconomicCode(e.target.value)}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 placeholder-white/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
                placeholder="مثال: 14012938791"
              />
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">
                نام انگلیسی مودی
              </label>
              <input
                type="text"
                value={englishName}
                onChange={(e) => setEnglishName(e.target.value)}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 placeholder-white/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
                placeholder="English name"
              />
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">
                نام فارسی مودی
              </label>
              <input
                type="text"
                value={persianName}
                onChange={(e) => setPersianName(e.target.value)}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 placeholder-white/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
                placeholder="نام فارسی"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn-custom4"
            >
              بساز
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
