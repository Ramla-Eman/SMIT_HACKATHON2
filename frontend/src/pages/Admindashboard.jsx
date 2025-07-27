import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StatsCards from "../components/ui/StatsCards";
import SearchControls from "../components/ui/SearchControls";
import FeedbacksTable from "../components/ui/FeedbacksTable";
import API from "../services/api";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const navigate = useNavigate();

  const feedbacksPerPage = 10;

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      toast.error("Please login to access the dashboard");
    } else {
      const handler = setTimeout(() => {
        fetchFeedbacks();
      }, 300); // Small delay to prevent rapid requests

      return () => clearTimeout(handler);
    }
  }, [currentPage, searchTerm, sortConfig, navigate]);

  const fetchFeedbacks = async () => {
    try {
      const response = await API.get(
        `/api/feedback?page=${
          currentPage + 1
        }&limit=${feedbacksPerPage}&search=${searchTerm}`
      );

      setFeedbacks(response.data.data.feedbacks);
      setPageCount(response.data.data.pagination.totalPages);
      setTotalFeedbacks(response.data.data.pagination.totalFeedbacks);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/api/admin/login");
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to fetch feedbacks");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update delete function to use API service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await API.delete(`/api/feedback/${id}`);
        toast.success("Feedback deleted successfully");
        fetchFeedbacks(); // Refresh the list
      } catch (error) {
        toast.error("Failed to delete feedback");
      }
    }
  };

  // Handle page change for pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (feedbacks.length === 0) return "0.0";
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return (sum / feedbacks.length).toFixed(1);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-app">
      {/* Dashboard Header */}
      <div className="bg-card shadow-sm border-b border-app">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-app">
                Feedback Dashboard
              </h1>
              <p className="text-secondary-app">
                Manage student feedback submissions
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <StatsCards
          totalFeedbacks={totalFeedbacks}
          averageRating={calculateAverageRating()}
          recentFeedback={feedbacks[0]?.createdAt}
        />

        {/* Search and Controls */}
        <SearchControls
          searchTerm={searchTerm}
          onSearch={handleSearch}
          totalFeedbacks={totalFeedbacks}
          currentCount={feedbacks.length}
        />

        {/* Feedbacks Table */}
        <FeedbacksTable
          feedbacks={feedbacks}
          loading={loading}
          onDelete={handleDelete}
          onSort={handleSort}
          sortConfig={sortConfig}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
