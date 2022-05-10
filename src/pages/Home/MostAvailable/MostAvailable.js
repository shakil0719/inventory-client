import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading/Loading";

const MostAvailable = () => {
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

  const arr = products.map((product) => product.quantity);
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const maxP = products.filter((product) => product.quantity == max);
  const maxProduct = maxP[0];
  const minP = products.filter((product) => product.quantity == min);
  const minProduct = minP[0];

  return (
    <div>
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
          <div className="container d-md-flex ">
            <div className="m-3">
              <h2 className="text-warning py-5">Most Available </h2>
              <div className="text-warning border border-warning p-3 rounded ">
                <img className="img-fluid" src={maxProduct?.img} alt="" />
                <h3 className="py-2">{maxProduct?.name}</h3>
                <p>Quantity: {maxProduct?.quantity}</p>
              </div>
            </div>
            <div className="m-3">
              <h2 className="text-warning py-5">Need To Re-stock</h2>
              <div className="text-warning border border-warning p-3 rounded ">
                <img className="img-fluid" src={minProduct?.img} alt="" />
                <h3 className="py-2">{minProduct?.name}</h3>
                <p>Quantity: {minProduct?.quantity}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MostAvailable;
