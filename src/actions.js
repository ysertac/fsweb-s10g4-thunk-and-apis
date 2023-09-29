import axios from "axios";
export const CLEAR_LS = "LS hepsini sil";
export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const clearLocalStorage = () => {
  return { type: CLEAR_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id };
};

export const fetchLoading = () => {
  return {
    type: FETCH_LOADING,
  };
};

export const fetchSuccess = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};

export const fetchError = (msg) => {
  return {
    type: FETCH_ERROR,
    payload: msg,
  };
};

export const fetchAnother = () => (dispatch) => {
  dispatch(fetchLoading());
  axios
    .get("https://official-joke-api.appspot.com/random_joke")
    .then((res) => {
      console.log(res.data);
      return dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      console.warn(err.response.message);
      return dispatch(fetchError(err.response.message));
    });
};
