import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchFilterBar({
  setFilterTable,
  searchTerm,
  onSearchTermChange,
  onRequestInvoiceDetails, // new
  selectedCustomerId, // new
}) {
  const [activeFilter, setActiveFilter] = useState("مشتری");

  const filterButtons = [
    "مشتری",
    "کالا/خدمات",
    "روش تسویه",
    "وضعیت ارسال",
    "ریز فاکتور اکسل",
    "ریز فاکتور",
    "به اکسل",
  ];

  const displayFilterButtons = filterButtons.slice(0, 4);
  const actionButtons = filterButtons.slice(4);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setFilterTable(filter);
  };

  const handleClearFilter = () => {
    setActiveFilter("");
    setFilterTable("");
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Search is handled by the parent component through onSearchTermChange
  };

  const handleSearchInputChange = (e) => {
    onSearchTermChange(e.target.value);
  };

  const handleDetailsRequest = () => {
    if (onRequestInvoiceDetails) onRequestInvoiceDetails();
  };

  return (
    <div className="w-full mb-4">
      {/* Search Bar */}
      <div className="w-full bg-gradient-to-b from-gray-900 to-gray- border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="جستجو..."
              className="w-full px-4 py-2 border bg-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={handleSearch} className="btn-custom">
            جستجو
          </button>
          {activeFilter && (
            <button onClick={handleClearFilter} className="btn-custom">
              {activeFilter} X
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 w-full bg-gradient-to-b from-gray-900 to-gray- border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-3">
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start gap-2">
            {displayFilterButtons.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(filter)}
                className={` ${
                  activeFilter === filter
                    ? "bg-green-600 text-white px-3 py-1.5 border rounded-lg"
                    : "btn-custom"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end gap-2">
            {/* Action Buttons */}
            <button
              className="btn-custom"
              onClick={handleDetailsRequest}
              disabled={!selectedCustomerId}
              style={
                !selectedCustomerId
                  ? { opacity: 0.5, cursor: "not-allowed" }
                  : {}
              }
            >
              ریز فاکتور
            </button>
            {actionButtons
              .filter((btn) => btn !== "ریز فاکتور")
              .map((filter, index) => (
                <button key={index + 4} className="btn-custom">
                  {filter}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
