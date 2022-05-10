import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ product }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://protected-badlands-97400.herokuapp.com/product")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const location = useLocation();
  const [user] = useAuthState(auth);
  let flag = null;
  if (user) {
    if (location.pathname === "/myItem" || location.pathname === "/inventory") {
      flag = 1;
    } else {
      flag = null;
    }
  }
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    const url = `/inventory/${id}`;
    navigate(url);
  };
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://protected-badlands-97400.herokuapp.com/product/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          const remaining = products.filter((product) => product._id !== id);
          setProducts(remaining);
          toast("Item Deleted");
          if (location.pathname === "/myItem") {
            navigate("/inventory");
          } else {
            navigate("/myItem");
          }
        });
    }
  };
  return (
    <div>
      <div className="d-md-flex border rounded border-warning m-3 justify-content-between p-3 bg-dark text-warning align-items-center">
        <div className="d-md-flex">
          <img
            className="rounded  img-fluid"
            style={{ height: "200px" }}
            src={product.img}
            alt=""
          />
          <div className="text-start ms-3">
            <h3>
              <span>{product.name}</span>
            </h3>
            <p>
              Price: <span>{product.price}</span>
            </p>
            <p>
              Available: <span>{product.quantity}</span>
            </p>
            <p>
              Supplier: <span>{product.supplier_name}</span>
            </p>
            <p>
              <span>{product.description}</span>
            </p>
          </div>
        </div>
        <div className="d-flex">
          <button
            className="d-md-flex align-items-center btn btn-warning me-2 fw-bold"
            onClick={() => handleNavigate(product._id)}
          >
            <FontAwesomeIcon
              className="mx-1"
              icon={faArrowTrendUp}
            ></FontAwesomeIcon>
            Update
          </button>
          {flag && (
            <button
              className="d-md-flex align-items-center btn btn-warning fw-bold"
              onClick={() => handleDelete(product._id)}
            >
              <FontAwesomeIcon
                className="mx-1"
                icon={faTrash}
              ></FontAwesomeIcon>
              Delete
            </button>
          )}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Product;
