import React from "react";
import axiosClient from "../../../plugins/axiosClient";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Books from "../../Books/Books";
const Sign_in = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    axiosClient
      .post("/auth/signin", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res?.data?.tokens?.access_token);
        if (res?.status === 201) {
          navigate("/side_bar");
        }
      });
  };
  return (
    <div className="w-[100%]">
      <h1 className="text-center mt-[100px] text-[40px]">Sign in</h1>
      <div>
        <form
          className=" h-[100vh] flex flex-col items-center mt-[100px]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-[200px] border-[2px] border-slate-200	 mt-[10px] p-[10px] rounded-xl"
            placeholder="username"
          />
          <input
            type="text"
            className="w-[200px] border-[2px] border-slate-200	 mt-[10px] p-[10px] rounded-xl"
            placeholder="password"
          />
          <button className="py-[10px] px-[40px] rounded-xl bg-green-600 text-white my-[20px]">
            Sign in
          </button>
        </form>
      </div>
      <Routes>
        <Route path="books" element={<Books />} />
      </Routes>
    </div>
  );
};

export default Sign_in;
