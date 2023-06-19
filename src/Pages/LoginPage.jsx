import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setLoading(false);
      setError("");
      localStorage.setItem("userInfo", JSON.stringify(data.message));
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div className="flex flex-col justify-center items-center">
      {loading ? (
        <div>
          <h4 className="text-[blue]">Loading....</h4>
        </div>
      ) : (
        <>
          <div className="text-blue-400 underline text-[40px]">Login</div>
          {error && (
            <div>
              <h4 className="text-[red]">{error}</h4>
            </div>
          )}
          <form className="flex flex-col w-[50%] gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-2">
              <label className="text-left w-[40%] text-[20px]" htmlFor="email">
                Email:{" "}
              </label>
              <input
                className="flex w-[40%] border-none rounded-[2px] pl-2 h-[30px] outline-none"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <label
                className="text-left w-[40%] text-[20px]"
                htmlFor="password"
              >
                Password:{" "}
              </label>
              <input
                className="flex w-[40%] border-none rounded-[2px] pl-2 h-[30px] outline-none"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-[100%] flex flex-col">
              <button
                className="w-[20%] text-white text-[15px] hover:bg-blue-500 ml-[40%] mt-[10px] py-1 rounded-[5px] flex flex-col justify-center items-center bg-[skyblue]"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
