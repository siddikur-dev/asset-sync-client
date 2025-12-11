import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router";

const EmployeePagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onLimitChange,
  currentItems 
}) => {
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit: itemsPerPage });
    if (onPageChange) onPageChange(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setSearchParams({ page: 1, limit: newLimit });
    if (onLimitChange) onLimitChange(newLimit);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="space-y-4">
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline"
        >
          <FaChevronLeft /> Previous
        </button>
        
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show max 5 page numbers
            if (
              page === 1 || 
              page === totalPages || 
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                >
                  {page}
                </button>
              );
            } else if (
              page === currentPage - 2 || 
              page === currentPage + 2
            ) {
              return <span key={page} className="px-2">...</span>;
            }
            return null;
          })}
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline"
        >
          Next <FaChevronRight />
        </button>
      </div>
      
      {/* Pagination Info */}
      <div className="flex justify-between items-center text-sm text-base-content/70">
        <div>
          Showing {currentItems || 0} of {totalItems} items
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className="select select-bordered select-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeePagination;