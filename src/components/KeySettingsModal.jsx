export default function KeySettingsModal({
  isOpen,
  data,
  onChangeText,
  onChangeFile,
  onSave,
  onClose,
}) {
  if (!isOpen) return null;
 
  const tinsError = data.tins && data.tins.length !== 11;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
      <div className="w-full max-w-3xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl overflow-hidden relative animate-slideIn">
        <div className="bg-gradient-to-l from-[#23234a] via-[#2e3a5c] to-[#6ec6ca] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-semibold">
            تنظیمات جهت ارسال دیتا به سامانه مودیان
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
        <div className="px-6 pt-6 pb-2">
          <div className="grid grid-cols-1  gap-4 items-end">
            <div className="md:col-span-3">
              <label className="block mb-1 text-white text-sm">
                کلید خصوصی(فرمت فایل .pem)
              </label>
              <input
                type="file"
                name="moadian_private_key"
                accept=".pem"
                onChange={onChangeFile}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block mb-1 text-white text-sm">
                گواهینامه (فرمت فایل.crt)
              </label>
              <input
                type="file"
                name="moadian_certificate"
                accept=".crt"
                onChange={onChangeFile}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">
                کد اقتصادی جدید :
              </label>
              <input
                name="tins"
                value={data.tins}
                onChange={onChangeText}
                className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 ${
                  tinsError
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-white/10 focus:ring-white/20"
                }`}
              />
              {tinsError && (
                <p className="text-red-400 text-xs mt-1">
                  کد اقتصادی باید ۱۱ رقم باشد
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">
                شناسه یکتای حافظه مالیاتی :
              </label>
              <input
                name="moadian_username"
                value={data.moadian_username}
                onChange={onChangeText}
                placeholder="0/6"
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 lg:py-2 lg:text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 pt-4 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-purple-700/90 text-white py-3 hover:bg-purple-800 transition-all"
          >
            انصراف
          </button>
          <button
            onClick={onSave}
            className="flex-1 rounded-xl bg-pink-400/70 text-[#23234a] font-bold py-3 hover:bg-pink-400 transition-all"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
