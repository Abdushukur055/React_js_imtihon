import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Auth from "./component/Auth/Auth";
import Sign_in from "./component/Auth/SignIn/Sign_in";
import Books from "./component/Books/Books";
import SideBar from "./component/sidebar/sideBar";
import Authors from "./component/Author/Authors";
import Categories from "./component/Categories/Categories";
import SingleBooks from "./component/Books/SingleBooks";
import SingleAuthor from "./component/Author/SingleAuthor";

export default function App() {
  return (
    <div>
      <div className="box">
      </div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="sign_in" element={<Sign_in />} />
        <Route path="books" element={<Books />} />
        <Route path="side_bar" element={<SideBar />} />
        <Route path="authors" element={<Authors/>}/>
        <Route path="cate" element={<Categories/>}/>
        <Route path="single_book/:id" element={<SingleBooks/>}/>
        <Route path="single_author/:id" element={<SingleAuthor/>}/>
      </Routes>
    </div>
  );
}
