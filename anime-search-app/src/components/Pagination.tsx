import React from 'react';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  hasNextPage, 
  onPageChange 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button 
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        ← Previous
      </button>
      
      <span className="pagination-current">
        Page {currentPage}
      </span>
      
      <button 
        onClick={handleNext}
        disabled={!hasNextPage}
        className="pagination-button"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;