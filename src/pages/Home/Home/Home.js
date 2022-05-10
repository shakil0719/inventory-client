import React from "react";
import Banner from "../Banner/Banner";

import Items from "../Items/Items";
import MostAvailable from "../MostAvailable/MostAvailable";
import Hope from "./Hope/Hope";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Items></Items>
      <MostAvailable></MostAvailable>
      <Hope></Hope>
    </div>
  );
};

export default Home;
