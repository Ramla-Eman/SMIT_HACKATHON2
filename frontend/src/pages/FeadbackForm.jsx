import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API from "../services/api";

const FeedbackForm = () => {
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    course: Yup.string()
      .required("Course is required")
      .min(3, "Course name must be at least 3 characters"),
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    comments: Yup.string().max(500, "Comments cannot exceed 500 characters"),
  });

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    course: "",
    rating: "",
    comments: "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await API.post("/api/feedback", values);
      toast.success("Feedback submitted successfully!");
      resetForm();
      setTimeout(() => {
        navigate("/thankyou");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  // Rating stars component
  const RatingStars = ({ field, form }) => {
    const rating = parseInt(form.values.rating) || 0;

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400 transition-colors`}
            onClick={() => form.setFieldValue(field.name, star)}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-app mb-2">Student Feedback</h1>
          <p className="text-secondary-app">
            Help us improve by sharing your experience
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-app mb-1"
                >
                  Full Name *
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-app rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-app"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-app mb-1"
                >
                  Email Address *
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-app rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-app"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Course Field */}
              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-app mb-1"
                >
                  Course Name *
                </label>
                <Field
                  type="text"
                  id="course"
                  name="course"
                  className="w-full px-4 py-2 border border-app rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-app"
                  placeholder="Enter course name"
                />
                <ErrorMessage
                  name="course"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Rating Field */}
              <div>
                <label className="block text-sm font-medium text-app mb-1">
                  Rating *
                </label>
                <Field name="rating">
                  {({ field, form }) => (
                    <RatingStars field={field} form={form} />
                  )}
                </Field>
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-error text-sm mt-1"
                />
                {values.rating && (
                  <p className="text-sm text-secondary-app mt-1">
                    You rated: {values.rating} star
                    {values.rating !== 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Comments Field */}
              <div>
                <label
                  htmlFor="comments"
                  className="block text-sm font-medium text-app mb-1"
                >
                  Comments
                </label>
                <Field
                  as="textarea"
                  id="comments"
                  name="comments"
                  rows="4"
                  className="w-full px-4 py-2 border border-app rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-app resize-none"
                  placeholder="Share your detailed feedback (optional)"
                />
                <ErrorMessage
                  name="comments"
                  component="div"
                  className="text-error text-sm mt-1"
                />
                <p className="text-xs text-secondary-app mt-1">
                  Maximum 500 characters
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FeedbackForm;
