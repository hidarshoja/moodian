import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react'
import {  useNavigate } from 'react-router-dom'

const Pagination = ({ meta, pageCount, setPageCount, setLoading }) => {
  const navigate = useNavigate()
 console.log(`pageCount`, pageCount);


  const genaratePages = () => {
    const pages = [];
    const totalPages = meta.last_page;
    const currentPage = meta.current_page;
  
    const displayPages = [];
    const maxPagesToShow = 5; // Adjust this value as needed
  
    // Determine which page numbers to display
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(currentPage - i) < 2) {
        displayPages.push(i);
      }
    }
  
    // Generate JSX elements for the page numbers
    for (let i = 0; i < displayPages.length; i++) {
      const page = displayPages[i];
  
      // If this page is not consecutive with the previous one, add ellipsis
      if (i > 0 && displayPages[i - 1] !== page - 1) {
        pages.push(<span key={`ellipsis${page}`} className="px-2">...</span>);
      }
  
      // Generate the page number button
      pages.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${page === currentPage  ? '"relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"' : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}`}
        >
          {page}
        </button>
      );
    }
  
    return pages;
  };
  

  const handlePageChange = (i) => {
    setPageCount(i)
    // navigate(`/bill?page=${i}`)
  }

  return (
    <div className="flex items-center justify-between  px-4 py-5 sm:px-6">
    
      <div className="flex flex-1 items-center justify-center">

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination" dir='ltr'>
            <button
             onClick={()=>{
              setPageCount(perv => perv - 1)
              // navigate(`/bill?page=${pageCount - 1}`)
            }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={pageCount === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}


            {genaratePages().map((page, index) => (
              <React.Fragment key={index}>
                {page}
              </React.Fragment>
            ))}

            {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span> */}
            <button
              onClick={()=>{
                setPageCount(perv => perv + 1)
                // navigate(`/bill?page=${pageCount + 1}`)
              }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={pageCount === meta.last_page}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination