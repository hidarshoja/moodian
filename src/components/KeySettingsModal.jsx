export default function KeySettingsModal({
  isOpen,
  data,
  onChangeText,
  onChangeFile,
  onSave,
  onClose,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="w-full max-w-3xl rounded-2xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden">
        <div className="bg-[#1f1e37] text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-semibold">
            تنظیمات جهت ارسال دیتا به سامانه مودیان
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
        <div className="px-6 pt-6 pb-2">
          <div className="grid grid-cols-1  gap-4 items-end">
            <div>
              <label className="block mb-2 text-white text-sm">
                فایل کلید خصوصی :
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".key,.pem,.txt"
                  onChange={onChangeFile}
                  className="flex-1 rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 lg:py-2 lg:text-sm file:mr-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-white"
                />
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/10"
                >
                  ...
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">
                کد اقتصادی جدید :
              </label>
              <input
                name="newEconomicCode"
                value={data.newEconomicCode}
                onChange={onChangeText}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 lg:py-2 lg:text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">
                شناسه یکتای حافظه مالیاتی :
              </label>
              <input
                name="taxMemoryUniqueId"
                value={data.taxMemoryUniqueId}
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
            className="flex-1 rounded-xl bg-purple-700/90 text-white py-3 hover:bg-purple-700"
          >
            انصراف
          </button>
          <button
            onClick={onSave}
            className="flex-1 rounded-xl bg-pink-400/70 text-white py-3 hover:bg-pink-400"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
