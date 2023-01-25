import {AppDispatch, AppThunk} from '../../types';
import {userDataActions} from '../../state-slices/user-data';
import {moviesApi} from '../../../utils/constants';
import {getResponseData} from '../json-verifiction';
import {TUser} from '../../types/data';

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
      })
  }
}

// export const updateUserData = (jwt: string | undefined,
//                                name: string, email: string): AppThunk => {
//   return function (dispatch: AppDispatch) {
//     dispatch(userDataActions.getUserData());
//
//     return fetch(`${moviesApi}/users/me`, {
//       method: 'PATCH',
//       mode: 'cors',
//       cache: 'no-cache',
//       // credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json',
//         'authorization': jwt ? jwt : ''
//       },
//       redirect: 'follow',
//       referrerPolicy: 'no-referrer',
//       body: JSON.stringify({
//         name,
//         email
//       })
//     })
//       .then(res => getResponseData<TUser>(res))
//       .then(data => {
//         console.log(document.cookie)
//         dispatch(userDataActions.updateUserData(data));
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(userDataActions.getUserDataFailed({message: error.message}));
//       })
//   }
// }