import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import img from "../assets/logo2.png";
import axiosClient from "../../plugins/axiosClient";

const BooksModal = ({ open, toggle, edit }) => {
  const [file, setFile] = useState("");
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosClient.get("/author").then((res) => {
      setAuthors(res?.data);
    });
    axiosClient.get("/category/get/all").then((res) => {
      setCategories(res?.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name: e.target[0].value,
      author_id: +e.target[1].value,
      price: +e.target[2].value,
      code: e.target[3].value,
      janr_id: +e.target[4].value,
      description: e.target[6].value,
    };
    const formData1 = new FormData();
    formData1.append("file", file);

    if (edit !== "") {
      axiosClient
        .patch(`/book/${edit.id}`, { ...payload })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosClient.post("/files/upload", formData1).then((res) => {
        if (res.status === 201) {
          axiosClient
            .post("/book/create", { ...payload, image: res.data.link })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1 className="text-[30px]">Add books</h1>
      </ModalHeader>
      <ModalBody>
        <div className="flex justify-center items-center">
          <img className="w-[200px] h-[200px]" src={img} alt="img" />
          <form onSubmit={handleSubmit} id="form">
            <input
              className="form-control my-[10px]"
              type="text"
              placeholder="name"
              defaultValue={edit.name}
            />
            <select
              defaultValue={edit.author_id}
              className="form-control my-[10px]"
            >
              <option value="" hidden>
                Select author id...
              </option>
              {authors?.map((item, index) => {
                return <option value={item.id}>{item.full_name}</option>;
              })}
            </select>
            <input
              className="form-control my-[10px]"
              type="number"
              placeholder="price"
              defaultValue={edit.price}
            />
            <input
              className="form-control my-[10px]"
              type="number"
              placeholder="code"
              defaultValue={edit.code}
            />
            <select
              defaultValue={edit.janr_id}
              className="form-control my-[10px]"
            >
              <option value="">Select your janr id...</option>
              {categories?.map((item, index) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
            <input
              className="form-control my-[10px]"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <textarea
              className="form-control my-[10px] resize-none"
              cols="30"
              rows="10"
              placeholder="Description"
              defaultValue={edit.description}
            ></textarea>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          form="form"
          className="w-[100px] bg-cyan-700 text-white px-[10px] rounded-xl py-[10px]"
        >
          add books
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default BooksModal;
