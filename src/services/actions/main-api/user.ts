import {AppDispatch, AppThunk} from '../../types';
import {userDataActions} from '../../state-slices/user-data';
import {moviesApi} from '../../../utils/constants';
import {getResponseData} from '../json-verifiction';
import {ErrorType, TUser} from '../../types/data';
import {errorsActions} from '../../state-slices/errors';

export const getUser = (): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(userDataActions.getUserData());

    return fetch(`${moviesApi}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => getResponseData<TUser>(res))
      .then(data => {
        dispatch(userDataActions.setUserData(data));
        dispatch(userDataActions.setIsAuthorized());
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

export const updateUserData = (name?: string, email?: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(userDataActions.getUserData());

    return fetch(`${moviesApi}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(res => getResponseData<TUser>(res))
      .then(data => {
        dispatch(userDataActions.updateUserData(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(userDataActions.getUserDataFailed({
          message: error.message,
          type: ErrorType.UPDATE
        }));
        dispatch(errorsActions.setLastError({
          error: {
            message: error.message,
          }
        }))
      })
  }
}