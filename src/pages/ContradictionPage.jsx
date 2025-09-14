import { useState } from "react";
import ContradictionFilter from "../components/ContradictionFilter";
import ContradictionTable from "../components/ContradictionTable";
import ContradictionTableRight from "../components/ContradictionTableRight";

export default function ContradictionPage() {
  const [fromYear, setFromYear] = useState(null);
  const [season, setSeason] = useState("");

  const [records] = useState([
    {
      name: "شرکت الف",
      factorMain: "13477767",
      factorCorrective: "TM-17003",
      factorReturn: "EC-478866",
      factorCancellation: "CC1111",
      pure: "11115",
    },
    {
      name: "شرکت ج",
      factorMain: "134567",
      factorCorrective: "TM-1003",
      factorReturn: "EC-445566",
      factorCancellation: "CCC333",
      pure: "123455",
    },
  ])

  

  const handleFromYearChange = (selectedDate) => {
    setFromYear(selectedDate);
  };

 



  

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

 



 
 
 return (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
  <div>
    <div className="w-full border-b border-white/10 p-6">
      <h1 className="text-white text-2xl font-bold">مغایرت گیری</h1>
      <p className="text-white/60 text-sm mt-1">نمای کلی مغایرت گیری کاربران</p>
    </div>
  </div>
  <ContradictionFilter
        fromYear={fromYear}
        season={season}
        onFromYearChange={handleFromYearChange}
        onSeasonChange={handleSeasonChange}
      />
      <div className="mt-3 flex flex-col md:flex-row gap-1">
        <div className="w-full md:w-2/5">
          <ContradictionTableRight  records={records}/>
        </div>
        <div className="w-full md:w-3/5">
          <ContradictionTable  records={records}/>
        </div>
      </div>
      
</div>
)
}
