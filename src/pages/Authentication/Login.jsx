import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../react-query/mutations/auth.mutation";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const mutation = useLoginMutation();

  useEffect(() => {
    if (mutation.isLoading) {
      const loadingToast = toast.loading("Logging in...");
      return () => toast.dismiss(loadingToast);
    }

    if (mutation.isError) toast.error(mutation.error.message);

    if (mutation.isSuccess) {
      toast.success("Logged in successfully!");
      const signedInUser = signInUser(mutation.data.tokens);
      navigate(signedInUser.is_admin ? "/admin/dashboard" : "/user/profile");
    }
  }, [
    mutation.isLoading,
    mutation.isError,
    mutation.isSuccess,
    mutation.error,
    mutation.data,
    signInUser,
    navigate,
  ]);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-4 mt-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="user@email.com"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-4 mt-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-lg ${isSubmitting && "opacity-50 cursor-not-allowed"}`}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/users/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
