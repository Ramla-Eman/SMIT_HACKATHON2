import React from 'react';
import ReactPaginate from 'react-paginate';

const FeedbacksTable = ({ 
  feedbacks, 
  loading, 
  onDelete, 
  onSort, 
  sortConfig, 
  onPageChange, 
  pageCount 
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  if (loading) {
    return (
      <div className="bg-card border border-app rounded-lg shadow-sm overflow-hidden">
        <div className="p-8 text-center">
          <div className="loading-spinner w-8 h-8 border-4 border-blue-200 border-t-primary rounded-full mx-auto mb-4"></div>
          <p className="text-secondary-app">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="bg-card border border-app rounded-lg shadow-sm overflow-hidden">
        <div className="p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="text-lg font-medium text-app mb-1">No feedbacks found</h3>
          <p className="text-secondary-app">
            Students haven't submitted any feedback yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-app rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-app">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-secondary-app uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center">
                  Student {getSortIndicator('name')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-secondary-app uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onSort('course')}
              >
                <div className="flex items-center">
                  Course {getSortIndicator('course')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-secondary-app uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onSort('rating')}
              >
                <div className="flex items-center">
                  Rating {getSortIndicator('rating')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-secondary-app uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onSort('createdAt')}
              >
                <div className="flex items-center">
                  Date {getSortIndicator('createdAt')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-app uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-app">
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-app">{feedback.name}</div>
                    <div className="text-sm text-secondary-app">{feedback.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-app">{feedback.course}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm text-app font-medium">{feedback.rating}/5</div>
                    <div className="ml-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-app">
                  {formatDate(feedback.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(feedback._id)}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="border-t border-app px-6 py-4">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            containerClassName={'flex items-center justify-center space-x-2'}
            pageClassName={'border border-app rounded-md'}
            pageLinkClassName={'px-3 py-1 text-sm font-medium text-app hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'}
            previousClassName={'border border-app rounded-md'}
            previousLinkClassName={'px-3 py-1 text-sm font-medium text-app hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'}
            nextClassName={'border border-app rounded-md'}
            nextLinkClassName={'px-3 py-1 text-sm font-medium text-app hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'}
            breakClassName={'border border-app rounded-md'}
            breakLinkClassName={'px-3 py-1 text-sm font-medium text-app hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'}
            activeClassName={'bg-primary border-primary'}
            activeLinkClassName={'text-white'}
          />
        </div>
      )}
    </div>
  );
};

export default FeedbacksTable;