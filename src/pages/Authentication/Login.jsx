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
      toast.success("Logged in successful!");
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
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="user@email.com"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Your password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <br />
          <p className="mt-4">Don&apos;t have an account? <Link to="/users/register" className="text-blue-600 font-semibold hover:underline">Register</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
