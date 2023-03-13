import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import appStyles from './app.module.css';

// Components
import {Main} from '../../pages/main/main';
import {Movies} from '../../pages/movies/movies';
import {SavedMovies} from '../../pages/saved-movies/saved-movies';
import {Register} from '../../pages/register/register';
import {Login} from '../../pages/login/login';
import {Profile} from '../../pages/profile/profile';
import {NotFound404} from '../../pages/not-found-404/not-found-404';
import {Footer} from '../footer/footer';
import {Header} from '../header/header';
import {Preloader} from '../preloader/preloader';
import {Popup} from '../popup/popup';
import {ProtectedRoute} from '../protected-route/protected-route';

// Storage
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {moviesDataActions} from '../../services/state-slices/movies-data';
import {popupActions} from '../../services/state-slices/popup';

// Api
import {getUser} from '../../services/actions/main-api/user';
import {filterCheckboxActions} from '../../services/state-slices/filter-checkbox';
import {searchFormActions} from '../../services/state-slices/search-form';
import {userDataActions} from '../../services/state-slices/user-data';
import {getCookie} from '../../utils/cookie';

function App() {
  const {
    moviesDataState,
    userDataState,
    searchFormState,
    popupState,
    errorsState
  } = useSelector((state) => {
    return state;
  })
  const dispatch = useAppDispatch();

  const handleOnClosePopup = () => {
    dispatch(popupActions.setIsClosed());
    document.body.classList.remove(appStyles['body-overlay']);
  }

  useEffect(() => {
    dispatch(userDataActions.setIsAuthorized(getCookie('jwt') !== undefined))
    dispatch(getUser());
    dispatch(searchFormActions.setLastSearchedValue(JSON.parse(localStorage.getItem('lastSearchRequest') || 'null')))
    dispatch(moviesDataActions.setLastFoundMovies(JSON.parse(localStorage.getItem('lastFoundMovies') || '[]')));
  }, [])

  useEffect(() => {
    let lastFilterCheckboxStateOnMoviesPage = localStorage.getItem('lastFilterCheckboxStateOnMoviesPage')
    let lastFilterCheckboxStateOnSavedMoviesPage = localStorage.getItem('lastFilterCheckboxStateOnSavedMoviesPage')

    if (!lastFilterCheckboxStateOnMoviesPage && !lastFilterCheckboxStateOnSavedMoviesPage) {
      return
    }
    if (lastFilterCheckboxStateOnMoviesPage) {
      dispatch(filterCheckboxActions.setIsCheckedOnMoviesPage(JSON.parse(lastFilterCheckboxStateOnMoviesPage)));
    }
    if (lastFilterCheckboxStateOnSavedMoviesPage) {
      dispatch(filterCheckboxActions.setIsCheckedOnSavedMoviesPage(JSON.parse(lastFilterCheckboxStateOnSavedMoviesPage)));
    }
  }, [])

  useEffect(() => {
    if (errorsState.lastError) {
      dispatch(popupActions.getAppErrorToOpenPopup(errorsState.lastError))
    }
  }, [errorsState.lastError])

  if ((moviesDataState.isLoading || userDataState.isLoading) && !searchFormState.isSearching) {
    return (
      <div className={appStyles.preloader}>
        <Preloader/>
      </div>
    )
  } else {
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
        {
          popupState.errorType.show &&
          <Popup primaryText={popupState.errorType.message ? popupState.errorType.message : "Что-то пошло не так :("}
                 secondaryText="Попробуйте повторить действие или обновить страницу"
                 onClose={handleOnClosePopup}/>
        }
      </BrowserRouter>
    )
  }
}

export default App;
