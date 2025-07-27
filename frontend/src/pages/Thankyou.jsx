import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Optional: for smooth animations

const Thankyou = () => {
  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card rounded-xl shadow-lg p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl font-bold text-app mb-4">Thank You!</h1>

          <p className="text-lg text-secondary-app mb-2">
            Your feedback has been submitted successfully.
          </p>

          <p className="text-secondary-app mb-8">
            We appreciate you taking the time to help us improve our courses and
            teaching quality.
          </p>

          {/* Additional Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <p className="text-blue-700 dark:text-blue-200 text-sm">
              <strong>Did you know?</strong> Your feedback directly helps us
              enhance the learning experience for all students.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02]"
            >
              Submit Another Feedback
            </Link>

            <Link
              to="/admin/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-app text-app font-medium rounded-lg transition duration-300 ease-in-out"
            >
              Admin Login
            </Link>
          </div>

          {/* Fun Element */}
          <div className="mt-8">
            <p className="text-secondary-app text-sm">Have a great day! 😊</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Thankyou;
