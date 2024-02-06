import React, { useEffect, useState } from "react";
import axiosClient from "../../plugins/axiosClient";
import img from "../assets/book.avif"

const SingleAuthor = () => {
  let url = window.location.href.split("/")[4];
  const [single_author, setSingle_author] = useState("");
    let [data, setData] = useState([])
  useEffect(() => {
    axiosClient.get(`/author/${url}`).then((res) => {
      setSingle_author(res?.data);
      setData(res.data.birthdate.slice(0, 10))
    }).catch(err=>{
      console.log(err);
    })
  }, []);
  return (
    <div>
      <div className="flex mt-[50px] items-center flex-col h-[100vh]">
        <div className="flex items-center gap-[50px]">
          <h1 className="text-[40px] mb-[100px]">Single book</h1>
          <img
            src={img}
            className=" mb-[70px] rounded-full w-[150px] h-[150px]"
            alt=""
          />
        </div>
        <div className="flex w-[900px] p-[20px] rounded-xl  border-gray-800 justify-center items-center gap-[50px] border-[2px] ">
          <img
            className="rounded-xl w-[550px] h-[400px]"
            src={single_author.image}
            alt=""
          />
          <div className="flex flex-col gap-[20px]">
            <h1 className="text-[25px]">Name: {single_author.full_name}</h1>
            <h1 className="text-[25px]">Country: {single_author.country}</h1>
            <div className="line w-[100%] bg-gray-800 h-[2px]"></div>
            <h1 className="text-[25px]">BirthDate: {data}</h1>
            <h1 className="text-[25px]">
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAuthor;
