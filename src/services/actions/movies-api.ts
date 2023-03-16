import {AppDispatch, AppThunk} from "../types";

import {getResponseData} from "./json-verifiction";
import {moviesDataActions} from '../state-slices/movies-data';
import {beatfilmMoviesApi} from '../../utils/constants';
import {TMovieItem} from '../types/data';
import {errorsActions} from '../state-slices/errors';

export const getMoviesDataFromSideApi = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    // загрузка данных: true
    return Promise.resolve(dispatch(moviesDataActions.getMoviesData()))
      .then(() => {
        return fetch(`${beatfilmMoviesApi}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => getResponseData<Array<TMovieItem>>(res))
          .then(res => dispatch(moviesDataActions.getMoviesDataSuccess(res)))
          .catch(error => {
            dispatch(moviesDataActions.getMoviesDataFailed({message: error.message}));
            dispatch(errorsActions.setLastError({
              error: {
                message: error.message,
              }
            }))
          })
      })


  }
}