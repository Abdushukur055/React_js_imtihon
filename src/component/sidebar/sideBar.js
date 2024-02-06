import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import App from "../../App";
import img from "../assets/book.avif";

const SideBar = () => {
  return (
    <div className="flex gap-[0px]">
      <div className="w-[300px] h-[100vh] bg-gray-900 flex justify-center flex-col items-center ">
        <img
          src={img}
          className="w-[200px] rounded-xl border-[2px] h-[200px] mb-[50px] hover:border-[10px] width-[300px] transition-all"
          alt=""
        />
        <div className="flex flex-col mb-[100px] gap-[60px]">
          <h1 className="text-center text-[30px] text-blue-700">Books</h1>
          <Link
            className="btn btn-primary w-[100px] hover:scale-125 bg-blue-900 transition-all"
            to="/books"
          >
            Books
          </Link>
          <Link
            className="btn btn-primary w-[100px] hover:scale-125 bg-blue-900 transition-all"
            to="/authors"
          >
            Authors
          </Link>
          <Link
            className="btn btn-primary w-[100px] hover:scale-125 bg-blue-900 transition-all"
            to="/cate"
          >
            Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
