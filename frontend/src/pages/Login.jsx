import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      await login(data);
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
        <h1 className="text-3xl font-display font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-6">Login to continue your adoption journey.</p>

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
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <Link to="/signup" className="text-primary font-semibold">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;