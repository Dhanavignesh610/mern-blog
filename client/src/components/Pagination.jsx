
export default function Pagination({onPaginationClick,currentPage,totalPages}) {
  return (
   <>
    <div className='flex justify-center my-8'>
        <button
          disabled={currentPage === 1}
          onClick={() => onPaginationClick(currentPage - 1)}
          className='px-3 py-1 mx-1 bg-gray-200 border disabled:!text-slate-500 text-sl border-slate-300 dark:bg-gray-700 text-black dark:text-white rounded'
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPaginationClick(index + 1)}
            className={`px-3 py-1 mx-1 border border-slate-300 disabled:!text-slate-500 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'} rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPaginationClick(currentPage + 1)}
          className='px-3 py-1 mx-1 bg-gray-200 border border-slate-300 disabled:!text-slate-500 dark:bg-gray-700 text-black dark:text-white rounded'
        >
          Next
        </button>
      </div>
   </>
  )
}

