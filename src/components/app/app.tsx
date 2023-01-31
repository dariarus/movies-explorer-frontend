import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import appStyles from './app.module.css';

import {Main} from '../../pages/main/main';
import {Movies} from '../../pages/movies/movies';
import {SavedMovies} from '../../pages/saved-movies/saved-movies';
import {Register} from '../../pages/register/register';
import {Login} from '../../pages/login/login';
import {Profile} from '../../pages/profile/profile';
import {NotFound404} from '../../pages/not-found-404/not-found-404';
import {Footer} from '../footer/footer';
import {Header} from '../header/header';
import {getMoviesDataFromSideApi} from '../../services/actions/movies-api';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {moviesDataActions} from '../../services/state-slices/movies-data';
import {getUser} from '../../services/actions/main-api/user';
import {ProtectedRoute} from '../protected-route/protected-route';
import {popupActions} from '../../services/state-slices/popup';


import moviesPageStyles from '../../pages/movies/movies.module.css';
import {getSavedMoviesData} from '../../services/actions/main-api/saved-movies';

function App() {
  const {userDataState, moviesDataState} = useSelector((state) => {
    return state;
  })
  const dispatch = useAppDispatch();

  const handleOnClosePopup = () => {
    dispatch(popupActions.setIsClosed());
    document.body.classList.remove(moviesPageStyles['body-overlay']);
  }

  useEffect(() => {
    dispatch(getMoviesDataFromSideApi());
    dispatch(getSavedMoviesData());
    dispatch(getUser());
    dispatch(moviesDataActions.setLastFoundMovies(JSON.parse(localStorage.getItem('lastFoundMovies') || '[]')));
    dispatch(moviesDataActions.setLastFoundMovies(JSON.parse(localStorage.getItem('savedMoviesArray') || '[]')));
    // dispatch(moviesDataActions.setLastFoundMovies(JSON.parse(localStorage.getItem('lastFoundSavedMovies') || '[]')));
  }, [])

  // if (moviesDataState.hasError || (userDataState.hasError && userDataState.error.message !== 'Ошибка авторизации')) {
  //   return (
  //     <Popup primaryText="Не удалось загрузить данные" secondaryText="Попробуйте обновить страницу"
  //            onClose={handleOnClosePopup}/>
  //   )
  // } else if (moviesDataState.isLoading || userDataState.isLoading) {
  //   return (
  //     <div className={appStyles.preloader}>
  //       <Preloader/>
  //     </div>
  //   )
  // } else {
    return (
      <BrowserRouter basename="/movies-explorer">
        <Header/>
        <main className={appStyles.main}>
          <Switch>

            <ProtectedRoute path="/movies" exact={true}>
              <Movies/>
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies" exact={true}>
              <SavedMovies/>
            </ProtectedRoute>
            <ProtectedRoute path="/profile" exact={true}>
              <Profile/>
            </ProtectedRoute>

            <Route path="/signup" exact={true}>
              <Register/>
            </Route>
            <Route path="/signin" exact={true}>
              <Login/>
            </Route>
            <Route path="/" exact={true}>
              <Main/>
            </Route>
            <Route path="*">
              <NotFound404/>
            </Route>

          </Switch>
        </main>
        <Footer/>
      </BrowserRouter>
    )
  // }
}

export default App;
