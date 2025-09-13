import { useState } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import ReportsFilter from "../components/ReportsFilter";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [toYear, setToYear] = useState(null);
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);
  const [season, setSeason] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(false);
  const [notSentStatus, setNotSentStatus] = useState(false);
  const [sentStatus, setSentStatus] = useState(false);
  const [successfulStatus, setSuccessfulStatus] = useState(true);

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const handleFromYearChange = (selectedDate) => {
    setFromYear(selectedDate);
  };

  const handleToYearChange = (selectedDate) => {
    setToYear(selectedDate);
  };

  const handleFromMonthChange = (selectedDate) => {
    setFromMonth(selectedDate);
  };

  const handleToMonthChange = (selectedDate) => {
    setToMonth(selectedDate);
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const handleErrorToggle = () => setErrorStatus(!errorStatus);
  const handlePendingToggle = () => setPendingStatus(!pendingStatus);
  const handleNotSentToggle = () => setNotSentStatus(!notSentStatus);
  const handleSentToggle = () => setSentStatus(!sentStatus);
  const handleSuccessfulToggle = () => setSuccessfulStatus(!successfulStatus);

  const handleClearAll = () => {
    setStartDate(null);
    setEndDate(null);
    setFromYear(null);
    setToYear(null);
    setFromMonth(null);
    setToMonth(null);
    setSeason("");
    setErrorStatus(false);
    setPendingStatus(false);
    setNotSentStatus(false);
    setSentStatus(false);
    setSuccessfulStatus(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">گزارش</h1>
          <p className="text-white/60 text-sm mt-1">نمای کلی گزارش کاربران</p>
        </div>
      </div>

      <SearchFilterBar />

      <ReportsFilter
        startDate={startDate}
        endDate={endDate}
        fromYear={fromYear}
        toYear={toYear}
        fromMonth={fromMonth}
        toMonth={toMonth}
        season={season}
        errorStatus={errorStatus}
        pendingStatus={pendingStatus}
        notSentStatus={notSentStatus}
        sentStatus={sentStatus}
        successfulStatus={successfulStatus}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onFromYearChange={handleFromYearChange}
        onToYearChange={handleToYearChange}
        onFromMonthChange={handleFromMonthChange}
        onToMonthChange={handleToMonthChange}
        onSeasonChange={handleSeasonChange}
        onErrorToggle={handleErrorToggle}
        onPendingToggle={handlePendingToggle}
        onNotSentToggle={handleNotSentToggle}
        onSentToggle={handleSentToggle}
        onSuccessfulToggle={handleSuccessfulToggle}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
