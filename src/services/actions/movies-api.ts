import {AppDispatch, AppThunk} from "../types";

import {getResponseData} from "./json-verifiction";
import {moviesDataSlice} from '../state-slices/movies-data';
import {beatfilmMoviesApi} from '../../utils/constants';
import {TMovieItem} from '../types/data';

const actionsMoviesData = moviesDataSlice.actions;

export const getMoviesDataFromSideApi = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    // загрузка данных: true
    dispatch(actionsMoviesData.getMoviesData());

    fetch(`${beatfilmMoviesApi}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => getResponseData<Array<TMovieItem>>(res))
      .then(res => {
        dispatch(actionsMoviesData.getMoviesDataSuccess(res))
      })
      .catch(error => {
        dispatch(actionsMoviesData.getMoviesDataFailed({message: error.message}))
      })
  }
}