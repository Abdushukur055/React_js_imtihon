import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axiosClient from "../../plugins/axiosClient";
import img from "../assets/logo2.png";

const AuthorModal = ({ open, toggle, edit }) => {
  const [file, setFile] = useState("");
  const [imageLink, setimageLink] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      full_name: e.target[0].value,
      birthdate: e.target[1].value,
      country: e.target[2].value,
    };

    const formData = new FormData();
    formData.append("file", file);
    if (edit !== "") {
      axiosClient
        .patch(`/author/${edit.id}`, { ...payload })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosClient.post("/files/upload", formData).then((res) => {
        if (res.status === 201) {
          axiosClient
            .post("/author", { ...payload, image: res?.data?.link })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1>Add authors</h1>
      </ModalHeader>
      <ModalBody>
        <div className="flex gap-[20px]">
          <img className="w-[200px] h-[200px]" src={img} alt="img" />
          <form onSubmit={handleSubmit} id="form">
            <input
              type="text"
              className="form-control my-[10px]"
              placeholder="Full name"
              defaultValue={edit.full_name}
            />
            <input
              type="date"
              className="form-control my-[10px]"
              placeholder="Birthdate"
              defaultValue={edit.birthdate}
            />
            <input
              type="text"
              className="form-control my-[10px]"
              placeholder="Country"
              defaultValue={edit.country}
            />
            <input
              type="file"
              name="image"
              className="form-control my-[10px]"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          form="form"
          className="w-[100px] p-[7px] rounded-xl bg-lime-500 text-white"
        >
          add authors
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AuthorModal;
