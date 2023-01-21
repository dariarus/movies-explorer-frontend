import {AppDispatch, AppThunk} from '../../types';
import {getResponseData} from '../json-verifiction';
import {userDataActions} from '../../state-slices/user-data';
import {moviesApi} from '../../../utils/constants';
import {TUser} from '../../types/data';
import {deleteCookie, getCookie, setCookie} from '../../../utils/cookie';

export const signup = (name?: string, email?: string, password?: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(userDataActions.getUserData());

    fetch(`${moviesApi}/signup`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })
      .then(res => getResponseData<TUser>(res))
      .then(data => {
        if (data) {
          dispatch(userDataActions.setUserData(data))
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(userDataActions.getUserDataFailed({message: error.message}))
      });
  }
}

export const signin = (email?: string, password?: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(userDataActions.getUserData());

    return fetch(`${moviesApi}/signin`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:3001',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => getResponseData<{ token: string }>(res))
      .then(data => {
        if (data) {
          setCookie('jwt', data.token);
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(userDataActions.getUserDataFailed({message: error.message}))
      });
  }
}

export const signout = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    return fetch(`${moviesApi}/signout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(res => getResponseData<{ success: boolean, message: string }>(res))
      .then(() => {
        deleteCookie('jwt')
        dispatch(userDataActions.deleteUserData());
      })
      .catch((error) => {
        console.log(error);
        dispatch(userDataActions.getUserDataFailed({message: error.message}))
      })
  }
}
