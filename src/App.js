import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  clearLocalStorage,
  fetchAnother,
  getFavsFromLocalStorage,
} from "./actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const loading = useSelector((store) => store.loading);
  const current = useSelector((store) => store.current);
  const favs = useSelector((store) => store.favs);
  const error = useSelector((store) => store.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavsFromLocalStorage());
    dispatch(fetchAnother());
  }, []);

  function handleAddToFavs() {
    dispatch(addFav(current));
  }

  function handleFetchAnother() {
    dispatch(fetchAnother());
  }

  function handleAllClear() {
    dispatch(clearLocalStorage());
  }
  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {error && (
            <div className="bg-red-600 p-6 text-center shadow-md">
              HATA: {error}
            </div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={handleFetchAnother}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={handleAddToFavs}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item) => (
                <FavItem key={item.id} id={item.id} item={item} />
              ))
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
            {favs.length > 0 && (
              <button
                onClick={handleAllClear}
                className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white"
              >
                Hepsini Sil
              </button>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
