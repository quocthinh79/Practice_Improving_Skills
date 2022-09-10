import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to="/data-feed-weather">Go feed weather data</Link>
    </div>
  );
};

export default HomePage;
