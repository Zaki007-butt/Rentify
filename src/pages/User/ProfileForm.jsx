import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../react-query/mutations/auth.mutation";
import { useUpdatePasswordMutation } from "../../react-query/mutations/auth.mutation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import defaultAvatar from "../../assets/default-avatar.png";

function ProfileUpdateForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name, // Initialize with empty string
      email: user.email, // Initialize with empty string
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const { mutateAsync: updateUser } = useUpdateProfileMutation();
  const { mutateAsync: updatePassword } = useUpdatePasswordMutation();

  const [avatarPreview, setAvatarPreview] = useState(user.avatar || null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      
      if (fileInputRef.current?.files[0]) {
        formData.append('avatar', fileInputRef.current.files[0]);
      }

      await updateUser(formData);
      toast.success("Profile updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordUpdate = async (data) => {
    try {
      await updatePassword({
        old_password: data.old_password,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      });
      toast.success("Password updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex justify-between mb-4 basis-full">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-slate-500 text-white rounded-lg"
        >
          &lt;&ensp;Back
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 basis-[48%] w-[320px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={avatarPreview || defaultAvatar}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full shadow-md object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
              >
                <FaCamera size={16} />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full mt-7"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 basis-[48%] w-[320px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Password
        </h2>
        <form onSubmit={handleSubmit(handlePasswordUpdate)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="old_password"
            >
              Old Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="old_password"
              type="password"
              {...register("old_password")}
            />
            {errors.old_password && (
              <p className="text-red-500">{errors.old_password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="new_password"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new_password"
              type="password"
              {...register("new_password")}
            />
            {errors.new_password && (
              <p className="text-red-500">{errors.new_password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="new_password_confirmation"
            >
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new_password_confirmation"
              type="password"
              {...register("new_password_confirmation")}
            />
            {errors.new_password_confirmation && (
              <p className="text-red-500">
                {errors.new_password_confirmation.message}
              </p>
            )}
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full mt-7"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdateForm;
