import React from "react";
import { Carousel } from "react-bootstrap";

import "./Banner.css";

const Banner = () => {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/3BT8nCZ/13.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="">
            <p className="font-style-heading">
              Your Comfort and Time Matters to Us
            </p>
            <p>
              <span className="font-style">Let's Experience the Speed</span>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/nkwk2Rk/14.jpg"
            alt="Second slide"
          />

          <Carousel.Caption className="">
            <p className="font-style-heading">
              Your Comfort and Time Matters to Us
            </p>
            <p>
              <span className="font-style">Let's Experience the Speed</span>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/J78WS2P/12.jpg"
            alt="Third slide"
          />

          <Carousel.Caption className="">
            <p className="font-style-heading">
              Your Comfort and Time Matters to Us
            </p>
            <p>
              <span className="font-style">Let's Experience the Speed</span>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
