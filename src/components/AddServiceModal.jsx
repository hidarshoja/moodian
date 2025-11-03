import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";
import SearchPublicIdentifiersModal from "./SearchPublicIdentifiersModal";
import PropTypes from "prop-types";

export default function AddServiceModal({
  isOpen,
  onClose,
  setRefresh,
  refresh,
  units,
}) {
  const [form, setForm] = useState({
    title: "",
    sstid: "",
    unit_id: null,
    vra: "",
    odt: "",
    odr: null,
    olt: "",
    olr: null,
    sstt: "توضیحات",
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [initialRates, setInitialRates] = useState({ vra: "", odr: null });

  // Update initialRates when modal opens
  useEffect(() => {
    if (isOpen) {
      setInitialRates({ vra: form.vra, odr: form.odr });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["odr", "olr", "unit_id"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? null : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // If both initial rates are empty, proceed as usual
    const bothRatesInitiallyEmpty =
      (!initialRates.vra && !initialRates.odr) ||
      (initialRates.vra === "" &&
        (initialRates.odr === null || initialRates.odr === ""));

    // Check if either vra or odr changed and was not empty initially
    const vraChanged = initialRates.vra !== "" && form.vra !== initialRates.vra;
    const odrChanged =
      initialRates.odr !== null && form.odr !== initialRates.odr;

    if (!bothRatesInitiallyEmpty && (vraChanged || odrChanged)) {
      // Some rate(s) modified! Show confirmation dialog
      const result = await Swal.fire({
        title:
          "شما مقادیر نرخ ارزش افزوده و/یا نرخ سایر مالیات را تغییر دادید. مطمئن هستید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله، ذخیره کن",
        cancelButtonText: "خیر، بازگردانی مقادیر قبلی",
      });

      if (!result.isConfirmed) {
        // Restore previous rates
        setForm((prev) => ({
          ...prev,
          vra: initialRates.vra,
          odr: initialRates.odr,
        }));
        return;
      }
    }

    try {
      await axiosClient.post(`/products`, form);

      // Success message
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "محصول با موفقیت اضافه شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });

      // Reset form
      setForm((prev) => ({
        ...prev,
        title: "",
        sstid: "",
        unit_id: null,
        vra: "",
        odt: "",
        odr: null,
        olt: "",
        olr: null,
        sstt: "توضیحات",
      }));

      setRefresh(!refresh);
      onClose();
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);

      // Extract error message from response
      let errorMessage = "خطا در اضافه کردن محصول";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        errorMessage = errorMessages.join("\n");
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error message
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  const handleSelectFromPublicIdentifiers = (item) => {
    // Populate form with selected item data
    setForm((prev) => ({
      ...prev,
      sstid: item.sstid || "",
      vra: item.vat || "",
      odr: item.vat_custom_purposes || "",
    }));
    setInitialRates({
      vra: item.vat || "",
      odr: item.vat_custom_purposes || "",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <span className="text-white text-lg font-bold">کالا/خدمت جدید</span>
          <span
            className="btn-custom3 cursor-pointer"
            onClick={() => setSearchModalOpen(true)}
          >
            <span>
              <CiSearch />
            </span>
            <span>درج از شناسه های عمومی</span>
          </span>
          <span
            className="btn-custom3 cursor-pointer"
            onClick={() => window.open("https://stuffid.tax.gov.ir/", "_blank")}
          >
            StuffId
          </span>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <GrClose />
          </button>
        </div>
        {/* Form */}
        <form
          className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSave}
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
            <select
              name="unit_id"
              value={form.unit_id}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {units?.length > 0 &&
                units?.map((u) => (
                  <option
                    key={u.id}
                    value={u.id}
                    className={u.id === 0 ? "text-red-500" : ""}
                  >
                    {u.title}
                  </option>
                ))}
            </select>
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
              className="px-6 py-2 rounded-xl bg-pink-300 text-[#23234a] font-bold hover:bg-pink-400 transition-all"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>

      {/* Search Public Identifiers Modal */}
      <SearchPublicIdentifiersModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectItem={handleSelectFromPublicIdentifiers}
      />
    </div>
  );
}

AddServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
  units: PropTypes.array.isRequired,
};
