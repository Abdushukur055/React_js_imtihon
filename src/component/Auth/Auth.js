import React from "react";
import axiosClient from "../../plugins/axiosClient";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let full_name = e.target[0].value;
    let username = e.target[1].value;
    let password = e.target[2].value;
    axiosClient
      .post("/auth/signup", {
        full_name: full_name,
        username: username,
        password: password,
      })
      .then((res) => {
        let url = res?.data?.tokens?.refresh_token;
        localStorage.setItem("token", url);
        if (res?.status === 201) {
          navigate("/sign_in");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-[100%]">
      <h1 className="text-center mt-[100px] text-[40px]">Sign up</h1>
      <div>
        <form
          className=" h-[100vh] flex flex-col items-center mt-[100px]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-[200px] border-[2px] border-slate-200	 mt-[10px] p-[10px] rounded-xl"
            placeholder="full name"
          />
          <input
            type="text"
            className="w-[200px] border-[2px] border-slate-200	 mt-[10px] p-[10px] rounded-xl"
            placeholder="username name"
          />
          <input
            type="text"
            className="w-[200px] border-[2px] border-slate-200	 mt-[10px] p-[10px] rounded-xl"
            placeholder="password"
          />
          <button className="py-[10px] px-[40px] rounded-xl bg-green-600 text-white my-[20px]">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
