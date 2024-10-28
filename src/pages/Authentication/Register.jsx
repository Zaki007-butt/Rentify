import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../react-query/mutations/auth.mutation";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const mutation = useRegisterMutation();

  useEffect(() => {
    if (mutation.isLoading) {
      const loadingToast = toast.loading("Creating account...");
      return () => toast.dismiss(loadingToast);
    }

    if (mutation.isError) toast.error(mutation.error.message);

    if (mutation.isSuccess) {
      toast.success("Registration successful!");
      signInUser(mutation.data.tokens);
      navigate("/users/profile");
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="user@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Your Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password Confirmation
            </label>
            <input
              type="password"
              id="password_confirmation"
              {...register("password_confirmation", { required: "Please confirm your password" })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
          >
            Register New Account
          </button>
          <br />
          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/users/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
