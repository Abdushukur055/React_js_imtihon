import React, { useEffect, useState } from "react";
import AuthorModal from "../Author/AuthorModal";
import { Link, Route, Routes } from "react-router-dom";
import SideBar from "../sidebar/sideBar";
import axiosClient from "../../plugins/axiosClient";
import BooksModal from "./BooksModal";

const Books = () => {
  const [modal, setModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState("");
  const toggle = () => {
    setModal(false);
    setEdit("");
  };

  useEffect(() => {
    axiosClient
      .get("/book")
      .then((res) => {
        setBooks(res?.data);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const DeleteBooks = (id) => {
    axiosClient
      .delete(`/book/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  const openEditModal = (item) => {
    setEdit(item);
    setModal(true);
  };

  return (
    <div className="flex gap-[200px] w-[100%] ">
      <div className="fixed">
        <SideBar />
      </div>
      <div className="flex gap-[50px] w-[100%] ml-[300px] p-[20px]">
        <BooksModal edit={edit} open={modal} toggle={toggle} />
        <button
          className="btn btn-success w-[100px] h-[50px]"
          onClick={() => setModal(true)}
        >
          open
        </button>
        <div className="flex  w-[100%] gap-[50px] h-[100vh] flex-wrap  pb-[120px]">
          {books?.map((item, index) => {
            return (
              <div className="rounded-xl border-[2px] border-black w-[350px] flex flex-col gap-[20px] h-[550px] p-[10px]">
                <img
                  src={item.image}
                  className="w-[100%] h-[250px] rounded-xl"
                  alt=""
                />
                <h1 className="text-[25px] ml-[20px]">Name: {item.name}</h1>
                <h1 className="text-[25px] ml-[20px]">Price: {item.price}</h1>
                <div className="flex justify-around">
                  <button
                    onClick={() => openEditModal(item)}
                    className="w-[100px] bg-sky-600 p-[10px] text-white rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => DeleteBooks(item.id)}
                    className="w-[100px] bg-red-500 p-[10px] text-white rounded-xl"
                  >
                    Delete
                  </button>
                </div>
                <button className="w-[100%] bg-violet-900 p-[10px] text-white rounded-xl">
                  <Link to={`/single_book/${item.id}`}>More</Link>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Books;
