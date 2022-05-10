import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "../Shared/Loading/Loading";

const ProductUpdate = () => {
  const [bool, setBool] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     fetch("https://protected-badlands-97400.herokuapp.com/product")
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data));
  //   }, []);
  const [flag, setFlag] = useState(null);

  const url = `https://protected-badlands-97400.herokuapp.com/product/${id}`;
  useEffect(() => {
    function fe() {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setFlag(true);
        });
    }
    fe();
  }, [bool]);
  const handleReStock = (val) => {
    fetch(
      `https://protected-badlands-97400.herokuapp.com/product/${id}?value=${val}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ val }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFlag(!flag);
        setBool(!bool);
      });
  };
  const [value, setValue] = useState();
  const handleDelivered = (val) => {
    fetch(
      `https://protected-badlands-97400.herokuapp.com/product/${id}?value=${val}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ val }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFlag(!flag);
        setBool(!bool);
      });
  };

  return (
    <div className="pt-5 bg-black text-warning ">
      {!flag && <Loading></Loading>}
      <div className="container py-3">
        <img className="img-fluid" src={product.img} alt="" />
        <div className="py-3">
          <h2>{product.name}</h2>
          <p>
            <span>Amount: {product.price}</span>
          </p>
          <p>
            <span>Quantity: {product.quantity}</span>
          </p>
          <p>
            <span>Supplier: {product.supplier_name}</span>
          </p>
          <p>
            <span>{product.description}</span>
          </p>
        </div>
        <div className="d-md-flex justify-content-center align-items-center">
          <div className="pe-2 d-md-flex">
            <input
              className="me-3"
              type="number"
              onBlur={(e) => {
                if (e.target.value === NaN || e.target.value < 0) {
                  setValue(0);

                  alert("Enter a Positive Value");
                  e.target.value = "";
                } else {
                  setValue(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                handleReStock(`${value}`);
              }}
              className="btn btn-warning fw-bold mt-2 mt-md-0"
            >
              Re-Stock
            </button>
          </div>
          <button
            onClick={() => handleDelivered("-1")}
            className="btn btn-warning fw-bold mt-2 mt-md-0"
          >
            Delivered
          </button>
        </div>
        <Link
          className=" text-warning"
          style={{ textDecoration: "none" }}
          to={"/inventory"}
        >
          <div className="d-flex align-items-center justify-content-end me-3">
            <span className="mx-3">Manage Inventory</span>
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductUpdate;
