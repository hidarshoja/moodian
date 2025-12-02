import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import Spinner from "../utils/Spinner";

export default function StatusCheckModal({
  isOpen,
  onClose,
  loading,
  result,
  errorMessage,
}) {
  if (!isOpen) return null;

  const hasResult = !!result;
  const data = result?.data || {};
  const errors = data?.error || [];
  const warnings = data?.warning || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">نتیجه چک وضعیت</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <GrClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-right">
          {loading && (
            <div className="flex flex-col items-center justify-center py-6 gap-4">
              <Spinner />
              <p className="text-white/80 text-sm">
                در حال بررسی وضعیت فاکتور در سامانه مودیان...
              </p>
            </div>
          )}

          {!loading && errorMessage && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/40 p-4 text-red-200 text-sm">
              {errorMessage}
            </div>
          )}

          {!loading && hasResult && (
            <div className="space-y-4">
              <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-sm text-white">
                <div className="mb-2">
                  <span className="font-semibold">رفرنس نامبر:</span>{" "}
                  {result.referenceNumber || "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">وضعیت:</span>{" "}
                  {result.status || "-"}
                </div>
                <div>
                  <span className="font-semibold">نتیجه:</span>{" "}
                  {data?.success ? "موفق" : "ناموفق"}
                </div>
              </div>

              {errors.length > 0 && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/40 p-4 text-sm text-red-100">
                  <h3 className="font-semibold mb-2 text-red-300">خطاها:</h3>
                  <ul className="space-y-1 list-disc pr-5">
                    {errors.map((err, idx) => (
                      <li key={idx}>
                        کد: {err.code} - {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {warnings.length > 0 && (
                <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/40 p-4 text-sm text-yellow-100">
                  <h3 className="font-semibold mb-2 text-yellow-300">
                    هشدارها:
                  </h3>
                  <ul className="space-y-1 list-disc pr-5">
                    {warnings.map((warn, idx) => (
                      <li key={idx}>
                        {warn.code || ""} - {warn.message || ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex justify-end bg-[#0a0a22] rounded-b-2xl">
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            onClick={onClose}
          >
            تأیید
          </button>
        </div>
      </div>
    </div>
  );
}

StatusCheckModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object,
  errorMessage: PropTypes.string,
};


