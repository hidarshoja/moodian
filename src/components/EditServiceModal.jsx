import { useState, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import PropTypes from "prop-types";

export default function EditServiceModal({
  isOpen,
  onClose,
  onEdit,
  loading,
  initialData = {},
  units,
}) {
  const [form, setForm] = useState({
    title: "",
    sstid: "",
    unit_id: "",
    vra: "",
    odt: "",
    odr: "",
    olt: "",
    olr: "",
    customCode: "",
  });
  const [unitSearch, setUnitSearch] = useState("");
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const unitDropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...form, ...initialData });
    }
    // eslint-disable-next-line
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(form);
  };

  const filteredUnits =
    Array.isArray(units) && units.length
      ? units.filter((u) => {
          if (!unitSearch?.trim()) return true;
          const q = unitSearch.toLowerCase();
          return (
            String(u.title || "")
              .toLowerCase()
              .includes(q) ||
            String(u.id || "")
              .toLowerCase()
              .includes(q)
          );
        })
      : [];

  // Sync search display with current selected unit when modal opens or data changes
  useEffect(() => {
    if (!isOpen) return;
    const selected = Array.isArray(units)
      ? units.find((u) => String(u.id) === String(form.unit_id))
      : null;
    setUnitSearch(selected?.title || "");
    // eslint-disable-next-line
  }, [isOpen, form.unit_id, units]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        unitDropdownRef.current &&
        !unitDropdownRef.current.contains(e.target)
      ) {
        setIsUnitOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectUnit = (u) => {
    setForm((prev) => ({ ...prev, unit_id: u?.id || "" }));
    setUnitSearch(u?.title || "");
    setIsUnitOpen(false);
  };

  const handleClearUnit = () => {
    setForm((prev) => ({ ...prev, unit_id: "" }));
    setUnitSearch("");
    setIsUnitOpen(true);
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <span className="text-white text-lg font-bold">ویرایش کالا/خدمت</span>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <GrClose />
          </button>
        </div>
        <form
          className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-1 text-white text-sm">
              نام کالا/خدمت
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">شناسه</label>
            <input
              name="sstid"
              value={form.sstid}
              onChange={handleChange}
              maxLength={13}
              minLength={13}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              کد کالا در سامانه مشتری
            </label>
            <input
              name="customCode"
              value={form.customCode}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">واحد سنجش</label>
            <div className="relative" ref={unitDropdownRef}>
              <input
                type="text"
                value={unitSearch}
                onChange={(e) => {
                  setUnitSearch(e.target.value);
                  setIsUnitOpen(true);
                }}
                onFocus={() => setIsUnitOpen(true)}
                placeholder="جستجو در واحدها..."
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 pr-4 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              {(unitSearch || form.unit_id) && (
                <button
                  type="button"
                  onClick={handleClearUnit}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 text-white"
                  aria-label="پاک کردن انتخاب"
                  title="پاک کردن"
                >
                  ×
                </button>
              )}
              {isUnitOpen && (
                <div className="absolute z-50 mt-2 w-full max-h-56 overflow-auto rounded-xl border border-white/10 bg-[#23234a] shadow-xl">
                  {filteredUnits.length === 0 ? (
                    <div className="px-3 py-2 text-white/60 text-sm">
                      موردی یافت نشد
                    </div>
                  ) : (
                    filteredUnits.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleSelectUnit(u)}
                        className={`w-full text-right px-4 py-2 text-white hover:bg-white/10 transition ${
                          String(form.unit_id) === String(u.id)
                            ? "bg-white/5"
                            : ""
                        }`}
                      >
                        {u.title}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نرخ ارزش افزوده
            </label>
            <input
              name="vra"
              value={form.vra}
              onChange={handleChange}
              type="number"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              موضوع سایر مالیات و عوارض
            </label>
            <input
              name="odt"
              value={form.odt}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نرخ سایر مالیات و عوارض
            </label>
            <input
              name="odr"
              value={form.odr}
              onChange={handleChange}
              type="number"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              موضوع سایر وجوه قانونی
            </label>
            <input
              name="olt"
              value={form.olt}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نرخ سایر وجوه قانونی
            </label>
            <input
              name="olr"
              value={form.olr}
              onChange={handleChange}
              type="number"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-white/10 text-white/80 bg-purple-700 hover:bg-purple-800 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-300 text-[#23234a] font-bold hover:bg-blue-400 transition-all"
              disabled={loading}
            >
              {loading ? "در حال ویرایش ..." : "ویرایش"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  initialData: PropTypes.object,
  units: PropTypes.array.isRequired,
};
