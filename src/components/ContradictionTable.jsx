export default function ContradictionTable({
  records
}) {
  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full">
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ صدور [کارپوشه] </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            مبلغ خالص [کارپوشه]
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            مبلغ ارزش افزوده [کارپوش]
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            تاریخ صدور [تجربه]
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            وضعیت [تجربه]
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            مبلغ خالص [تجربه]
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            مبلغ ارزش افزوده [تجربه]
              </th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-6 text-center text-white/60 text-sm"
              >
                موردی ثبت نشده است.
              </td>
            </tr>
          )}
          {records.map((r, i) => (
            <tr
              key={i}
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.name}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.factorMain}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.factorCorrective }
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.factorReturn}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {r.factorCancellation}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                {r.pure}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                {r.pure}
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
