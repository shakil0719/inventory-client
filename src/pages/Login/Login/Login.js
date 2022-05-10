import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import SocialLogin from "../../Shared/SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../Shared/Loading/Loading";
import axios from "axios";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const emailRef = useRef("");

  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (loading) {
    <Loading></Loading>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signInWithEmailAndPassword(email, password);
    const { data } = await axios.post(
      "https://protected-badlands-97400.herokuapp.com/login",
      { email }
    );
    console.log(data);
    localStorage.setItem("accessToken", data.accessToken);
    navigate(from, { replace: true });
  };

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      console.log(email);
      if (email) {
        toast("Sent email");
      } else {
        toast("Please enter email address");
      }
    } else {
      toast("Please Enter Email");
    }
  };

  if (user) {
    // navigate(from, { replace: true });
  }

  const handleRegister = () => {
    navigate("/register");
  };

  let message;
  if (error) {
    message = error.message;
  }
  return (
    <div className="min-vh-100 container d-flex flex-column align-items-center justify-content-center text-warning mt-5 ">
      <h2 className="pb-3">Log-In</h2>
      <div className="container d-flex align-items-center justify-content-center ">
        <Form
          className="w-50 m-auto form border border-warning rounded p-3 shadow-lg"
          onSubmit={handleSubmit}
        >
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
          {message}
          <button
            type="submit"
            className="btn btn-warning fw-bold  d-block mx-auto golden"
          >
            Log-In
          </button>

          <p className="mt-3 text-center">
            Don't Have an Account?
            <span
              onClick={handleRegister}
              className="btn btn-link text-decoration-none "
            >
              Register
            </span>
          </p>
          <p className="mt-3 text-center">
            Forget Password?
            <span
              onClick={resetPassword}
              className="btn btn-link text-decoration-none "
            >
              Reset Password
            </span>
          </p>
        </Form>
      </div>
      <SocialLogin></SocialLogin>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
