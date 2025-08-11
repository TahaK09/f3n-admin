import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext.jsx";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const { success, error } = await signInUser(email, password);

    if (!success) {
      setError(error);
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Redirect after successful sign-in
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSignIn}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
          </p>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              Sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email id"
              className="bg-transparent outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent outline-none text-sm w-full h-full"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <label className="flex items-center gap-2 text-sm">
              <input className="h-5" type="checkbox" />
              Remember me
            </label>
            <a className="text-sm underline" href="#">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90"
          >
            Login
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
