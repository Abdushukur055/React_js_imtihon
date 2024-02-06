import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import img from "../assets/book-composition-with-open-book_23-2147690555.avif";
import axiosClient from "../../plugins/axiosClient";

const CategoriesModal = ({ open, toggle, edit }) => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name: e.target[0].value,
    };
    if (edit !== "") {
      axiosClient
        .patch(`/category/update/${edit.id}`, { ...payload })
        .then((res) => {
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
    } else {
      axiosClient
        .post("/category/create", {
          ...payload,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1>Add categories</h1>
      </ModalHeader>
      <ModalBody>
        <div className="flex justify-center items-center gap-[50px]">
          <img src={img} className="w-[200px] h-[200px] rounded-xl" alt="" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              defaultValue={edit.name}
            />
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className=" bg-lime-800 rounded-xl text-white w-[150px] p-[7px]">
          Add categories
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CategoriesModal;
