import React from 'react';
import { GrClose } from "react-icons/gr";

export default function ErrorModal({ open, onClose, errors }) {
  if (!open) return null;

  return (
    <div 
     className="fixed  inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
   
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
        {(!errors || errors.length === 0) ? (
          <div className="text-center text-white py-8 text-base">خطایی وجود ندارد.</div>
        ) : (
          <ul className="rtl space-y-4 p-2 max-h-72 overflow-y-auto scrollbar-thin">
            {errors.map((err, i) => (
              <li
                key={err.id || i}
                className="border border-red-300 rounded-lg p-3 bg-gray-600 text-right"
              >
                <p className="text-red-400 font-semibold mb-2">مقدار خطا: {err.error_message}</p>
                <div className="text-xs text-gray-600 flex flex-col gap-1">
                  <span className="text-right text-white"><b>ردیف:</b> {err.row}</span>
                  <span className="text-right text-white"><b>ستون:</b> {err.column}</span>
                  <span className="text-right text-white"><b>شیت:</b> {err.sheet}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
