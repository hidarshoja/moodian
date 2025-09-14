export default function ContradictionTableRight({
  records
}) {
  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full">
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap">
            شماره فاکتور فروش [کارپوشه]
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            شماره فاکتور فروش [تجربه]
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
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
