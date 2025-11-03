import React from 'react';

export default function ErrorModal({ open, onClose, errors }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-lg text-gray-500 hover:text-black"
          title="بستن"
        >✕</button>
        <h3 className="font-bold text-right text-lg text-red-700 mb-4">لیست عرورها</h3>
        {(!errors || errors.length === 0) ? (
          <div className="text-center text-black/70 py-8 text-base">عروری وجود ندارد.</div>
        ) : (
          <ul className="rtl space-y-4 max-h-72 overflow-y-auto scrollbar-thin">
            {errors.map((err, i) => (
              <li
                key={err.id || i}
                className="border border-red-200 rounded-lg p-3 bg-red-50 text-right"
              >
                <p className="text-red-800 font-semibold mb-2">مقدار خطا: {err.error_message}</p>
                <div className="text-xs text-gray-600 flex flex-col gap-1">
                  <span><b>ردیف:</b> {err.row}</span>
                  <span><b>ستون:</b> {err.column}</span>
                  <span><b>شیت:</b> {err.sheet}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
