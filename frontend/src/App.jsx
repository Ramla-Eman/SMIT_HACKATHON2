import React from "react";
import { Routes, Route } from "react-router-dom";
import FeedbackForm from "./pages/FeadbackForm";
import ThankYou from "./pages/Thankyou";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/Admindashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="min-h-screen bg-app text-app">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
