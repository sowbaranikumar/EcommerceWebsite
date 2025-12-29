import { useState } from "react";
import type { FormEvent } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false); 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center px-4">
      <div className="bg-gray-50 border border-gray-300 rounded-xl shadow-lg px-10 py-8 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h1>

        {success && (
          <div className="mb-4 text-green-700 font-semibold text-center">
            Successfully Logged In!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Email ID</label>
            <input
              type="email"
              className="w-full border border-gray-400 rounded-md px-4 py-3 text-white-800 focus:outline-none focus:border-blue-600"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-400 rounded-md px-4 py-3 text-white-800 focus:outline-none focus:border-blue-600"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
