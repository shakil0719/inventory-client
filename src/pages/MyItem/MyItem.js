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
          `https://protected-badlands-97400.herokuapp.com/myItem?email=${user.email}`,
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
    <div className="pt-4">
      {!flag && (
        <>
          <div className="con">
            <span>~ My Items ~</span>
          </div>
          <Loading></Loading>
        </>
      )}
      {flag && (
        <>
          <div className="bon">
            <span>~ My Items ~</span>
          </div>
          {products?.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </>
      )}
    </div>
  );
};

export default MyItem;
