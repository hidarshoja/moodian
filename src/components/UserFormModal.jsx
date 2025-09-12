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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">
            {isEditing ? "ویرایش کاربر" : "افزودن کاربر"}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>
        <form onSubmit={onSubmit} className="px-6 py-6 grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-white text-sm">نام کاربری</label>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نام و نام خانوادگی
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">نوع کاربر</label>
            <input
              name="role"
              value={form.role}
              onChange={onChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:bg-white/10"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500"
            >
              {isEditing ? "بروزرسانی" : "افزودن"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
