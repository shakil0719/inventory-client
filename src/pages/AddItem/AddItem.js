import React from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  //   async function run() {
  //     await user;
  //   }
  //   run();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(errors);
  const onSubmit = (data) => {
    console.log(data.quantity);
    data.email = user.email;
    reset();
    const url = `https://protected-badlands-97400.herokuapp.com/product`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast("Item Added");
        navigate("/inventory");
      });
  };
  return (
    <div className="container min-vh-100 pt-5">
      <h3 className="text-warning fw-bold">
        <span>Add Item</span>
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" d-flex flex-column p-3 w-100 mx-auto  "
      >
        <div className="w-50 mx-auto text-center d-flex flex-column justify-content-center border border-warning shadow-lg p-4 rounded-3">
          <input
            placeholder="Name"
            className="mb-2"
            {...register("name", { required: true, maxLength: 30 })}
          />
          {/* <input
            placeholder="Email"
            className="mb-2"
            {...register("gmail", { required: true, maxLength: 30 })}
            value={user?.email}
            readOnly
          /> */}
          <textarea
            placeholder="Description"
            className="mb-2"
            {...register("description", { required: true, maxLength: 30 })}
          />
          <input
            placeholder="Price"
            className="mb-2"
            type="text"
            {...register("price", { required: true, maxLength: 30 })}
          />
          <input
            placeholder="Supplier"
            className="mb-2"
            type="text"
            {...register("supplier_name", { required: true, maxLength: 30 })}
          />
          <input
            placeholder="Quantity"
            className="mb-2"
            type="number"
            {...register("quantity", { required: true, valueAsNumber: true })}
          />
          <input
            placeholder="Photo URL"
            className="mb-2"
            type="text"
            {...register("img", { required: true, maxLength: 30 })}
          />
          <input
            type="submit"
            value="Add"
            className="btn btn-warning fw-bold"
          />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
