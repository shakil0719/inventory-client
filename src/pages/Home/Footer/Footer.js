import React from "react";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div
      style={{ height: "100px" }}
      className="d-flex align-items-center justify-content-center bg-dark text-warning"
    >
      <footer>
        <p className="">
          <small className="fw-bold">copyright &copy; {year}</small>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
