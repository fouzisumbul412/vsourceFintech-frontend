import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const login = async () => {

    const res =
      await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
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
  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="w-[400px] p-6 border rounded">

        <h1 className="text-xl font-bold mb-5">
          CRM Login
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Login
        </button>

      </div>

    </div>
  );
}