import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
export default function ErrorListModal({ isOpen, onClose, errors }) {
  if (!isOpen) return null;

  return (
    <div
    className="fixed  inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
    onClick={onClose}
     >
       <div
        className="w-full max-w-4xl  max-h-[90vh] rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
       <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold mb-4 text-center text-red-600">لیست خطاها</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <GrClose className="w-5 h-5" />
          </button>
        </div>
      <div className="p-2">
        <ul className="space-y-3 mb-6 max-h-72 overflow-auto text-right">
          {errors && errors.length > 0 ? (
            errors.map((item, idx) => (
              <li
                key={idx}
                className=" rounded p-2 bg-white/10 text-red-800"
              >
                <span className="font-semibold">کد: {item.code}</span>
                <br />
                <span>پیغام: {item.message}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-600">خطایی وجود ندارد.</li>
          )}
        </ul>
        <button
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={onClose}
        >
          بستن
        </button>
      </div>
       {/* Header */}
      </div>
    </div>
  );
}

ErrorListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  errors: PropTypes.array,
};