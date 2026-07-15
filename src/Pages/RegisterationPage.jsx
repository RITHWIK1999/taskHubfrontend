import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registration } from "../api/Api";

function RegisterationPage() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error("Please enter a valid email!");
      return;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    try {
      const response = await registration(data);
      console.log(response.status);

      if (response.status === 409) {
        toast.error("The Email Already Exist");
        return;
      }

      if (response.status === 201) {
        navigate("/");
        toast.success("Registration successful!");
        setData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        return;
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400  to-blue-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-blue-950">
           TaskHub
          </h1>
          <p className="text-black mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2  focus:ring-blue-950 focus:ring-opacity-75 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>

          <p className="text-center text-gray-900 text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-950 font-bold cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterationPage;
