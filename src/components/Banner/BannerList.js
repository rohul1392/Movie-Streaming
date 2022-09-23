import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { getBanners } from "../../features/movies/movieSlice";
import Banner from "./Banner";
const Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
const BannerList = () => {
  const banners = useSelector(getBanners);
  return (
    <React.Fragment>
          <Slider {...Settings}>
            {
              banners.Response === "True" ? (
                banners.Search.map((movie, index) => (
                  <Banner key={index} data={movie} />
                ))
              ) : (
                <div className="movies-error">
                  <h3>{banners.Error}</h3>
                </div>
              )
            }
            </Slider>
        </React.Fragment>
  );
};

export default BannerList;
