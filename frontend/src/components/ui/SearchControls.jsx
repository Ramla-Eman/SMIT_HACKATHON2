import React, { useState, useEffect } from 'react';

const SearchControls = ({ searchTerm, onSearch, totalFeedbacks, currentCount }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch({ target: { value: localSearchTerm } });
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, onSearch]);

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <div className="bg-card border border-app rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by course name..."
              value={localSearchTerm}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-2 border border-app rounded-lg bg-card text-app focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-secondary-app">
            Showing {currentCount} of {totalFeedbacks} feedbacks
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchControls;