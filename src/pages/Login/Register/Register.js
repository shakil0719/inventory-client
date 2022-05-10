import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import SocialLogin from "../../Shared/SocialLogin";

const Register = () => {
  const [sendEmailVerification, sending, Error] =
    useSendEmailVerification(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    await sendEmailVerification();
    toast("Please Verify");
  };
  if (user) {
    navigate("/home");
    console.log(user);
  }
  let errorMessage;
  if (error) {
    errorMessage = <p>{error.message}</p>;
  }
  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-vh-100 container text-warning d-flex flex-column align-items-center justify-content-center mt-5">
      <h2 className="pb-3">Register</h2>
      <div className="container d-flex align-items-center justify-content-center ">
        <Form className="w-50 m-auto form border border-warning rounded-3 p-3 shadow-lg">
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              ref={nameRef}
              type="text"
              placeholder=" Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              ref={emailRef}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          {errorMessage}
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-warning fw-bold  d-block mx-auto golden"
          >
            Sign-Up
          </button>

          <p className="mt-3 text-center">
            Don't Have an Account?
            <span
              onClick={navigateLogin}
              className="btn btn-link text-decoration-none "
            >
              Log-In
            </span>
          </p>
        </Form>
      </div>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
