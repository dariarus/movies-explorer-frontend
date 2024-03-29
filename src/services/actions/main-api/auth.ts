import {AppDispatch, AppThunk} from '../../types';
import {getResponseData} from '../json-verifiction';
import {userDataActions} from '../../state-slices/user-data';
import {moviesApi} from '../../../utils/constants';
import {ErrorType, TUser} from '../../types/data';
import {errorsActions} from '../../state-slices/errors';
import {savedMoviesDataActions} from '../../state-slices/saved-movies-data';
import {searchFormActions} from '../../state-slices/search-form';
import {moviesDataActions} from '../../state-slices/movies-data';
import {inputValuesActions} from '../../state-slices/input-values';

export const signup = (name?: string, email?: string, password?: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(userDataActions.getUserData());

    fetch(`${moviesApi}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })
      .then(res => getResponseData<TUser>(res))
      .then(data => {
        if (data) {
          return dispatch(userDataActions.setUserData(data))
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(userDataActions.getUserDataFailed({message: error.message}));
        dispatch(errorsActions.setLastError({
          error: {
            message: error.message,
          }
        }))
      });
  }
}

export const signin = (email?: string, password?: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(userDataActions.getUserData());

    return fetch(`${moviesApi}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => getResponseData<{ token: string }>(res))
      .then(() => {
        return dispatch(userDataActions.setIsAuthorized(true));
      })
      .catch((error) => {
        console.log(error)
        dispatch(userDataActions.getUserDataFailed({
          message: error.message,
          type: ErrorType.SIGNIN
        }));
        dispatch(errorsActions.setLastError({
          error: {
            message: error.message,
          }
        }))
      });
  }
}

export const signout = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    return fetch(`${moviesApi}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => getResponseData<{message: string}>(res))
      .then(() => {
        dispatch(userDataActions.deleteUserData());
        dispatch(inputValuesActions.clearInputValuesState());
        dispatch(moviesDataActions.resetMoviesState());
        dispatch(savedMoviesDataActions.resetSavedMoviesState());
        dispatch(searchFormActions.deleteLastSearchedValues());
        localStorage.removeItem('lastFoundMovies');
        localStorage.removeItem('lastSearchRequest');
        localStorage.removeItem('lastFilterCheckboxState');
      })
      .catch((error) => {
        console.log(error);
        dispatch(userDataActions.getUserDataFailed({message: error.message}));
        dispatch(errorsActions.setLastError({
          error: {
            message: error.message,
          }
        }))
      })
  }
}
