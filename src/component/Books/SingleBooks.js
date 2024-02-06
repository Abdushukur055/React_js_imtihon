import React, { useEffect, useState } from "react";
import axiosClient from "../../plugins/axiosClient";
import img from "../assets/book.avif"

const SingleBooks = () => {
  const [single_book, setSingleBook] = useState("");
  let url = window.location.href.split("/")[4];
  console.log(url);
  useEffect(() => {
    axiosClient.get(`/book/${url}`).then((res) => {
      setSingleBook(res?.data);
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })
  }, []);
  return (
    <div className="flex mt-[50px] items-center flex-col h-[100vh]">
      <div className="flex items-center gap-[50px]">
        <h1 className="text-[40px] mb-[100px]">Single book</h1>
        <img src={img}  className=" mb-[70px] rounded-full w-[150px] h-[150px]" alt="" />
      </div>
      <div className="flex w-[900px] p-[20px] rounded-xl  border-gray-800 justify-center items-center gap-[50px] border-[2px] ">
        <img
          className="rounded-xl w-[550px] h-[400px]"
          src={single_book.image}
          alt=""
        />
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-[30px]">Name: {single_book.name}</h1>
          <h1 className="text-[30px]">Country: {single_book.price}</h1>
          <h1 className="text-[30px]">Code: {single_book.code}</h1>
          <h1 className="text-[30px]">Janr id:{single_book.janr_id}</h1>
          <div className="line w-[100%] bg-gray-800 h-[2px]"></div>
          <h1 className="text-[30px]">Description:{single_book.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default SingleBooks;
