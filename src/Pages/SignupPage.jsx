import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/", {
        username,
        password,
        email,
      });
      setError('')
      localStorage.setItem("userInfo", JSON.stringify(data.message));
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-blue-400 underline text-[40px]">Signup</div>
      {error && (
        <div>
          <h4 className="text-[red]">{error}</h4>
        </div>
      )}
      <form className="flex flex-col w-[50%] gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-2">
          <label className="text-left w-[40%] text-[20px]" htmlFor="email">
            Username:{" "}
          </label>
          <input
            className="flex w-[40%] border-none rounded-[2px] pl-2 h-[30px] outline-none"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
          <label className="text-left w-[40%] text-[20px]" htmlFor="password">
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
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
