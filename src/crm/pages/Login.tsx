import { useState } from "react";
import axios from "axios";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      window.location.href =
        "/crm/dashboard";
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
        "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 via-red-500 to-blue-600 text-white p-12 flex-col justify-center">

        <h1 className="text-5xl font-extrabold mb-4">
          VSource Fintech CRM
        </h1>

        <p className="text-lg opacity-90 max-w-md">
          Manage leads, admissions, applications,
          and customer interactions from one
          centralized platform.
        </p>

        <div className="mt-10 space-y-4">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
            ✓ Form Submissions
          </div>

          {/* <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
            ✓ Student Applications
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
            ✓ Real-time Tracking
          </div> */}
        </div>

      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-extrabold text-red-600">
              VSource
            </h1>

            <p className="text-gray-500 mt-2">
              CRM Management System
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-black mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-500 mb-8">
              Login to continue
            </p>

            {/* Email */}
            <div className="relative mb-5">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  pl-11
                  pr-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* Password */}
            <div className="relative mb-6">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="password"
                placeholder="Password"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  pl-11
                  pr-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && login()
                }
              />

            </div>

            {/* Login Button */}
            <button
              onClick={login}
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                text-white
                font-semibold
                py-3
                rounded-xl
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <LogIn size={18} />

              {loading
                ? "Logging In..."
                : "Login"}
            </button>

            {/* Footer */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-500">
                © {new Date().getFullYear()} VSource Fintech CRM
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}