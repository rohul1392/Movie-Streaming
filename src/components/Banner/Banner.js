import React from "react";
import { Link } from "react-router-dom";
import "./Banner.scss";

const Banner = (props) => {
  const { data } = props;
  return (
    <div className="banner-item">
      <Link to={`/movie/${data.imdbID}`}>
          <div className="banner-top">
            <img src={data.Poster} alt={data.Title} />
          </div>
      </Link>
    </div>
  );
};

export default Banner;
