import { useState } from "react";
import ContradictionFilter from "../components/ContradictionFilter";


export default function ContradictionPage() {
  const [fromYear, setFromYear] = useState(null);
  const [season, setSeason] = useState("");

 

  

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
</div>
)
}
