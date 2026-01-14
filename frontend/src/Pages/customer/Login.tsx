import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/customer/Button";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,{withCredentials:true}
      );

      const {accesstoken,refreshtoken,user}=response.data;
      console.log("LoggedUser",user);
      localStorage.setItem("Accesstoken", accesstoken);
      localStorage.setItem("refreshToken", refreshtoken);
      localStorage.setItem("role", user.role);

      if (user.role === "ADMIN") {
        navigate("/dashboard");
      } else if (user.role === "CUSTOMER") {
        navigate("/home");
      }
    } catch (error: any) {
      console.log(error.response?.data);
      setApiError(error.response?.data?.message||"Login failed");
    }
  };

  return (
    <div className="h-screen bg-white w-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-500 rounded-xl shadow-lg px-10 py-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">
          Login
        </h1>

        {apiError && (
          <p className="text-red-600 text-center mb-4">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div>
            <label className="text-sm border-black text-gray-500 font-semibold">Email ID</label>
            <input
              type="email"
              className="w-full border text-black bg-white px-4 py-3 rounded-md"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>


          <div>
            <label className="text-sm border-black text-gray-500 font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border text-black bg-white px-4 py-3 rounded-md"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit">LOGIN</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
