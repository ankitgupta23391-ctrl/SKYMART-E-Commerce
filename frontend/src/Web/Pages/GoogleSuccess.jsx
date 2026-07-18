import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function GoogleSuccess() {
const navigate = useNavigate();

useEffect(() => {
try {
const params = new URLSearchParams(
window.location.search
);

  const token = params.get("token");
  const user = params.get("user");

  if (!token) {
    toast.error("Google Login Failed");
    navigate("/login", { replace: true });
    return;
  }

  // Save JWT Token
  localStorage.setItem("token", token);

  // Save User
  if (user) {
    const userData = JSON.parse(user);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  }

  // Login Flag
  localStorage.setItem("isLogin", "true");

  toast.success("Google Login Successful");

  // Redirect Home
  setTimeout(() => {
    navigate("/", { replace: true });
  }, 1000);
} catch (error) {
  console.log("Google Login Error:", error);

  toast.error("Google Login Failed");

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLogin");

  navigate("/login", { replace: true });
}


}, [navigate]);

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100"> <div className="bg-white shadow-xl rounded-2xl p-10 text-center w-[400px]"> <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

    <h2 className="text-3xl font-bold mt-6 text-gray-800">
      Google Login
    </h2>

    <p className="text-gray-500 mt-3">
      Please wait...
    </p>
  </div>
</div>

);
}

export default GoogleSuccess;
