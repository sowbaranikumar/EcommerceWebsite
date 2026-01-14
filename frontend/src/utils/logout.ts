import axios from "axios";

export const logout = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      { refreshToken: localStorage.getItem("refreshToken") },
      { withCredentials: true }
    );
  } catch (err) {
    console.error("Logout API failed:", err);
  }

  localStorage.removeItem("Accesstoken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
};
