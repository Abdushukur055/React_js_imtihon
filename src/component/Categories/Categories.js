import React, { useEffect, useState } from "react";
import CategoriesModal from "./CategoriesModal";
import SideBar from "../sidebar/sideBar";
import axiosClient from "../../plugins/axiosClient";

const Categories = () => {
  const [modal, setModal] = useState(false);
  const [janr, setJanr] = useState([]);
  const [edit, setEdit] = useState("");
  const toggle = () => {
    setModal(false);
    setEdit("");
  };

  useEffect(() => {
    axiosClient
      .get("/category/get/all")
      .then((res) => {
        setJanr(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteJanr = (id) => {
    axiosClient
      .delete(`/category/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEditModal = (item) => {
    setEdit(item);
    setModal(true);
  };
  return (
    <div className="flex">
      <SideBar />
      <CategoriesModal edit={edit} open={modal} toggle={toggle} />
      <button
        className="btn btn-success w-[100px] h-[50px] m-[10px]"
        onClick={() => setModal(true)}
      >
        open
      </button>

      <div className="box">
        <table className="table table-bordered table-hover mt-[10px]">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Name</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {janr?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteJanr(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
