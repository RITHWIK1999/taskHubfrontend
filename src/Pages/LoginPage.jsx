import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/Api";
import { toast } from "react-toastify";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log(response.status);

      if (response.status === 400) {
        toast.error("Some Feilds Are Required");
      }
      if (response.status === 404) {
        toast.error("You Are Not Registered");

        return;
      }
      if (response.status === 401) {
        toast.error("Password Doesnot Match");
      }

      if (response.status === 200) {
        toast.success("SuccessFully Logged In");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("id", response.data.id);
        console.log(response.data);

        navigate("/home");
      }

      setFormData({ email: "", password: "" });
      return;
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error("Login failed");
      } else {
        toast.error("Cannot connect to the server");
      }
    }
    console.log("Login Submitted", formData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl lg:mt-0 mt-10 p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-blue-950">
            TaskHub
          </h1>
          <p className="text-black mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-blue-950 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold  hover:bg-blue-600 focus:outline-none focus:ring-2  focus:ring-blue-950 focus:ring-opacity-75 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>

          <p className="text-center text-gray-900 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-950 font-bold   cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
