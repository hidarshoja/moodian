import PropTypes from "prop-types";

export default function UserFormModal({
  isOpen,
  isEditing,
  form,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
      <div className="w-full max-w-2xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl flex-shrink-0">
          <h3 className="text-white font-semibold">
            {isEditing ? "ویرایش کاربر" : "افزودن کاربر"}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto flex-1"
        >
          <div>
            <label className="block mb-1 text-white text-sm">نام</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نام خانوادگی
            </label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              کد اقتصادی مودی
            </label>
            <input
              name="tins"
              value={form.tins}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">ایمیل</label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">رمز عبور</label>
            <input
              type="password"
              name="password"
              value={form.password || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">تلفن</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block mb-2 text-white text-sm">نقش‌ها</label>
            <div className="flex items-center gap-6 text-white/90">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roles"
                  value={1}
                  checked={Array.isArray(form.roles) && form.roles.includes(1)}
                  onChange={onChange}
                />
                <span>admin (1)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roles"
                  value={2}
                  checked={Array.isArray(form.roles) && form.roles.includes(2)}
                  onChange={onChange}
                />
                <span>super admin (2)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roles"
                  value={3}
                  checked={Array.isArray(form.roles) && form.roles.includes(3)}
                  onChange={onChange}
                />
                <span>user (3)</span>
              </label>
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="block mb-1 text-white text-sm">
              شناسه sstids
            </label>
            <input
              name="sstids"
              value={
                Array.isArray(form.sstids)
                  ? form.sstids[0] || ""
                  : form.sstids || ""
              }
              onChange={(e) => {
                // Only allow numeric input and limit to 13 characters
                const value = e.target.value.replace(/\D/g, "").slice(0, 13);
                onChange({
                  target: {
                    name: "sstids",
                    value: value,
                  },
                });
              }}
              placeholder="13 رقم وارد کنید"
              maxLength={13}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-1 text-white text-sm">وضعیت</label>
            <input
              type="number"
              name="status"
              value={form.status ?? 100}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-1 text-white text-sm">
              کد حافظه مالیاتی
            </label>
            <input
              name="moadian_username"
              value={form.moadian_username || ""}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block mb-1 text-white text-sm">
              کلید خصوصی(فرمت فایل .pem)
            </label>
            <input
              type="file"
              name="moadian_private_key"
              accept=".pem"
              onChange={onChange}
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
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-white text-sm">آدرس</label>
            <input
              name="address"
              value={form.address}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">کد پستی</label>
            <input
              name="postal_code"
              value={form.postal_code}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/10 text-white/80 bg-red-500 hover:bg-red-600 w-1/2 transition-all"
            >
              انصراف
            </button>
            <button type="submit" className="btn-custom4">
              {isEditing ? "بروزرسانی" : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UserFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool,
  form: PropTypes.shape({
    name: PropTypes.string,
    last_name: PropTypes.string,
    tins: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    mobile: PropTypes.string,
    status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    roles: PropTypes.arrayOf(PropTypes.number),
    sstids: PropTypes.string,
    moadian_username: PropTypes.string,
    moadian_private_key: PropTypes.any,
    moadian_certificate: PropTypes.any,
    address: PropTypes.string,
    postal_code: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
