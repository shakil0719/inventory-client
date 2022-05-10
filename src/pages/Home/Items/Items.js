import React, { useEffect, useState } from "react";
import "./Items.css";
import { Link } from "react-router-dom";
import Product from "../../Inventory/Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Shared/Loading/Loading";
const Items = () => {
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(null);
  useEffect(() => {
    function fe() {
      fetch("https://protected-badlands-97400.herokuapp.com/product")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFlag(1);
        });
    }
    fe();
  }, []);
  return (
    <div>
      {/* <div className="">
        <h1 data-shadow="dang!">Item</h1>
      </div> */}

      {!flag && (
        <>
          <div className="con">
            <span>~ Items ~</span>
          </div>
          <Loading></Loading>
        </>
      )}
      {flag && (
        <>
          <div className="bon">
            <span>~ Items ~</span>
          </div>
          {products.slice(0, 6).map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
          <div className="d-flex align-items-center justify-content-end me-3">
            <Link
              className=" text-warning"
              style={{ textDecoration: "none" }}
              to={"/inventory"}
            >
              <span className="mx-3">Manage Inventory</span>
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Items;
