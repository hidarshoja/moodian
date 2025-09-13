import { useState } from "react";

export default function SearchFilterBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const filterButtons = [
    "مشتری",
    "کالا/خدمات",
    "روش تسویه",
    "وضعیت ارسال",
    "ریز فاکتور اکسل",
    "ریز فاکتور",
    "به اکسل",
  ];

  // Only the first 4 buttons should change the search bar display
  const displayFilterButtons = filterButtons.slice(0, 4);
  const actionButtons = filterButtons.slice(4);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleClearFilter = () => {
    setActiveFilter(""); // Clear the active filter
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="w-full mb-4">
      {/* Search Bar */}
      <div className="w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-white text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
          >
            جستجو
          </button>
          {activeFilter && (
            <button
              onClick={handleClearFilter}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              {activeFilter} X
            </button>
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Display Filter Buttons (first 4) */}
        {displayFilterButtons.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "bg-gray-600 text-white"
                : "bg-white text-black border border-red-500 hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}

        {/* Action Buttons (last 3) */}
        {actionButtons.map((filter, index) => (
          <button
            key={index + 4}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-black border border-red-500 hover:bg-gray-50"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
