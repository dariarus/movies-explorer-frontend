import {AppDispatch, AppThunk} from "../types";

import {getResponseData} from "./json-verifiction";
import {moviesDataActions} from '../state-slices/movies-data';
import {beatfilmMoviesApi} from '../../utils/constants';
import {TMovieItem} from '../types/data';

export const getMoviesDataFromSideApi = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    // загрузка данных: true
    dispatch(moviesDataActions.getMoviesData());

    fetch(`${beatfilmMoviesApi}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => getResponseData<Array<TMovieItem>>(res))
      .then(res => {
        dispatch(moviesDataActions.getMoviesDataSuccess(res))
      })
      .catch(error => {
        dispatch(moviesDataActions.getMoviesDataFailed({message: error.message}))
      })
  }
}