import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./NotFound/NotFound";
import AddItem from "./pages/AddItem/AddItem";
import Blog from "./pages/Blog/Blog";
import Footer from "./pages/Home/Footer/Footer";
import Header from "./pages/Home/Header/Header";
import Home from "./pages/Home/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Login from "./pages/Login/Login/Login";
import Register from "./pages/Login/Register/Register";
import MyItem from "./pages/MyItem/MyItem";
import ProductUpdate from "./pages/ProductUpdate/ProductUpdate";
import RequireAuth from "./pages/Shared/RequireAuth";

function App() {
  return (
    <div className="App bg-black">
      <Header></Header>
      <Routes>
        <Route
          path="/inventory"
          element={
            <RequireAuth>
              <Inventory></Inventory>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/inventory/:id"
          element={
            <RequireAuth>
              <ProductUpdate></ProductUpdate>
            </RequireAuth>
          }
        ></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/myItem"
          element={
            <RequireAuth>
              <MyItem></MyItem>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/addItem"
          element={
            <RequireAuth>
              <AddItem></AddItem>
            </RequireAuth>
          }
        ></Route>
        <Route path="/blog" element={<Blog></Blog>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
