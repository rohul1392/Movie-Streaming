import React, { useEffect } from "react";
import { getSearchResult } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
    fetchSearchResult,
  } from "../../features/movies/movieSlice";
import "./SearchResult.scss";

const SearchResult = () => {
    const dispatch = useDispatch();
  const movies = useSelector(getSearchResult);
  const { query } = useParams();
  useEffect(() => {
    dispatch(fetchSearchResult(query));
  }, [dispatch, query]);
  return (
    <div className="search-wrapper">
      <div className="search-list">
        <h2>Search Result</h2>
        <div className="search-container">
            {movies.Response === "True" ? (
              movies.Search.map((movie, index) => (
                <MovieCard key={index} data={movie} />
              ))
            ) : (
              <div className="movies-error">
                <h3>{movies.Error}</h3>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
