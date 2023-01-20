import {AppDispatch, AppThunk} from '../../types';
import {userDataActions} from '../../state-slices/user-data';
import {moviesApi} from '../../../utils/constants';
import {getResponseData} from '../json-verifiction';
import {TUser} from '../../types/data';
import {getCookie} from '../../../utils/cookie';

export const getUser = (accessToken: string | undefined, retryOnErrorCount?: number): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(userDataActions.getUserData());

    return fetch(`${moviesApi}/users/me`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? `${accessToken}` : ''
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(res => getResponseData<TUser>(res))
      .then(data => {
        console.log(document.cookie)
        dispatch(userDataActions.updateUserData(data))
      })
      .then(() => {
        if (!retryOnErrorCount) { // retryOnErrorCount нужен: если токен так и не может успешно обновиться (refreshToken невалиден),
          // есть только n попыток повторно вызвать getUser ниже - чтобы вызов getUser не зациклился до бесконечности
          return
        }
        return dispatch(getUser(getCookie('accessToken'), (retryOnErrorCount - 1)))
      })
      .catch((error) => {
        console.log(error);
        dispatch(userDataActions.getUserDataFailed({message: error.message}));
      })
  }
}

export const updateUserData = (accessToken: string | undefined,
                                name: string, email: string,
                                password: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(userDataActions.getUserData());

    return fetch(`${moviesApi}/users/me`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken ? accessToken : ''
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(res => getResponseData<TUser>(res))
      .then(data => {
        console.log(document.cookie)
          dispatch(userDataActions.updateUserData(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(userDataActions.getUserDataFailed({message: error.message}));
      })
  }
}