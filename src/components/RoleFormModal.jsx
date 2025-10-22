import PropTypes from "prop-types";

export default function RoleFormModal({
  isOpen,
  isEditing,
  form,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1220] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-bold">
            {isEditing ? "ویرایش نقش" : "ایجاد نقش"}
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">نام نقش</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="مثال: Admin"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isEditing ? "ذخیره" : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

RoleFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool,
  form: PropTypes.shape({ name: PropTypes.string }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
