import rateLimit from "express-rate-limit";
// More lenient rate limiting for admin routes
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Keep strict rate limiting for feedback submission
const feedbackLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message:
      "Too many feedback submissions from this IP, please try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { adminLimiter, feedbackLimiter };
