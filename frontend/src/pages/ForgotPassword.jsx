import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await forgotPassword(data.email);
      setMessage("If an account exists for that email, reset instructions have been generated.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass rounded-xl3 p-8 shadow-soft"
      >
        <h1 className="text-3xl font-display font-bold text-center mb-2">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">Enter your email and we'll help you reset it.</p>

        {message && <p className="bg-accent/10 text-accent text-sm px-4 py-2 rounded-lg mb-4">{message}</p>}
        {error && <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Remembered your password? <Link to="/login" className="text-primary font-semibold">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;