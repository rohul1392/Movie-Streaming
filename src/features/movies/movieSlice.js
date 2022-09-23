import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchBannerMovies = createAsyncThunk(
  "movies/fetchBannerMovies",
  async () => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=superman&type=movie`
    );
    return response.data;
  }
);

export const fetchBatmanMovies = createAsyncThunk(
  "movies/fetchBatmanMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchLatestMovies = createAsyncThunk(
  "movies/fetchLatestMovies",
  async () => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=2022&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);
export const fetchSearchResult = createAsyncThunk(
  "movies/fetchSearchResult",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

const initialState = {
  banners: {},
  batmanMovies: {},
  latest: {},
  selectMovieOrShow: {},
  searchResult: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchBatmanMovies.fulfilled]: (state, { payload }) => {
      return { ...state, batmanMovies: payload };
    },
    [fetchLatestMovies.fulfilled]: (state, { payload }) => {
      return { ...state, latest: payload };
    },
    [fetchBannerMovies.fulfilled]: (state, { payload }) => {
      return { ...state, banners: payload };
    },
    [fetchSearchResult.fulfilled]: (state, { payload }) => {
      return { ...state, searchResult: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      return { ...state, selectMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getBanners = (state) => state.movies.banners;
export const getBatmanMovies = (state) => state.movies.batmanMovies;
export const getLatest = (state) => state.movies.latest;
export const getSearchResult = (state) => state.movies.searchResult;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
