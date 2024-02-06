import React, { useEffect } from "react";
import SideBar from "../sidebar/sideBar";
import AuthorModal from "./AuthorModal";
import { useState } from "react";
import axiosClient from "../../plugins/axiosClient";
import { Link } from "react-router-dom";

const Authors = () => {
  const [modal, setModal] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [edit, setEdit] = useState("");
  const toggle = () => {
    setModal(false);
    setEdit("");
  };

  const openEditModal = (item) => {
    setEdit(item);
    setModal(true);
  };

  useEffect(() => {
    axiosClient
      .get("/author")
      .then((res) => {
        setAuthors(res?.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteModal = (id) => {
    axiosClient
      .delete(`/author/${id}`)
      .then((res) => {
        if (res?.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex gap-[100px] flex-col">
      <div className="fixed">
        <SideBar />
      </div>
      <AuthorModal edit={edit} open={modal} toggle={toggle} />
      <button
        className="btn btn-info  w-[100px] h-[40px] mt-[20px] ml-[350px]"
        onClick={() => setModal(true)}
      >
        open
      </button>
      <div className="flex gap-[30px] ml-[345px] flex-wrap p-[30px]">
        {authors?.map((item, index) => {
          return (
            <div className="w-[400px] border-[2px] rounded-xl p-[20px] border-black">
              <img
                className="w-[400px] h-[400px] rounded-xl"
                src={item.image}
                alt=""
              />
              <h1 className="text-[30px] m-[10px]">Name:{item.full_name}</h1>
              <h1 className="text-[30px] m-[10px]">Country:{item.country}</h1>
              <div className="flex justify-around mt-[20px]">
                <button
                  className="w-[100px] bg-sky-600 p-[10px] text-white rounded-xl"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>

                <button
                  className="w-[100px] bg-red-600 p-[10px] text-white rounded-xl"
                  onClick={() => deleteModal(item.id)}
                >
                  Delete
                </button>
              </div>
              <button className="w-[100%] bg-violet-900 p-[10px] mt-[20px] text-white rounded-xl">
                <Link to={`/single_author/${item.id}`}>More</Link>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Authors;
