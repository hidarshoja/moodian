
// eslint-disable-next-line react/prop-types
export default function SearchFilterBarBill({
  searchTerm,
  onSearchTermChange,

}) {
  




  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleSearchInputChange = (e) => {
    onSearchTermChange(e.target.value);
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
          
        </div>
      </div>

     
    </div>
  );
}
