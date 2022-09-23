import React, { useEffect } from "react";
import MovieList from "../MovieListing/MovieList";
import BannerList from '../Banner/BannerList'

import { useDispatch } from "react-redux";
import {
  fetchBatmanMovies,
  fetchLatestMovies,
  fetchBannerMovies
} from "../../features/movies/movieSlice";
const Home = () => {
  const dispatch = useDispatch();
  const movieText = "Batman movie";
  const showText = "Friends";
  useEffect(() => {
    dispatch(fetchBatmanMovies(movieText));
    dispatch(fetchLatestMovies(showText));
    dispatch(fetchBannerMovies());
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <BannerList />
      <MovieList />
    </div>
  );
};

export default Home;
