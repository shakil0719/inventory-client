import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
import Product from "./Product/Product";

const Inventory = () => {
  const navigate = useNavigate();
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
  const handleClick = () => {
    navigate("/addItem");
  };
  return (
    <div className="bg-black p-3">
      {!flag && (
        <>
          <div className="con pb-5">
            <span>~ Inventory ~</span>
          </div>
          <Loading></Loading>
        </>
      )}
      {flag && (
        <>
          <div className="bon pb-5">
            <span>~ Inventory ~</span>
          </div>
          <button onClick={handleClick} className="btn btn-warning fw-bold">
            Add Item
          </button>

          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </>
      )}
    </div>
  );
};

export default Inventory;
