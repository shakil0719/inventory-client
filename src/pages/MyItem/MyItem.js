import React, { useEffect, useState } from "react";
import Product from "../Inventory/Product/Product";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import axios from "axios";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const MyItem = () => {
  const [user] = useAuthState(auth);

  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fe = async () => {
      try {
        // await fetch(`http://localhost:5000/myItem?email=${user.email}`, {
        //   headers: {
        //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     setProducts(data);
        //     setFlag(1);
        //   });
        const { data } = await axios.get(
          `https://inventory-car-app.herokuapp.com/myItem?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProducts(data);
        setFlag(1);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 403 || error.response.status === 401) {
          signOut(auth);
          navigate("/");
        }
      }
    };

    fe();
  }, []);

  //   const myProduct = products.filter((p) => p.gmail === user?.email);

  //   const filter = products.filter(product =>{
  //       if(product.email == )
  //   })

  return (
    <div className="pt-4 min-vh-100 ">
      {!flag && (
        <>
          <div className="con">
            <span>~ My Items ~</span>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Loading></Loading>
          </div>
        </>
      )}
      {flag && (
        <>
          <div className="bon">
            <span>~ My Items ~</span>
          </div>
          <div
            style={{ minHeight: "300px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            {products.length < 1 && (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <p className="b">
                  <p className="p">No Items Found</p>
                </p>
                {/* <NotFound></NotFound> */}
              </div>
            )}
            {products.length > 0 &&
              products?.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyItem;
