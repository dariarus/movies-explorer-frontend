import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IMoviesDataSliceState} from '../types/index';
import {TErrorState, TMovieItem} from '../types/data'
import {IMoviesDataActions} from '../types/action-type';

export const moviesDataSlice = createSlice({
  name: 'moviesData', // префикс всех экшнов
  initialState: {
    isLoading: false,
    hasError: false,
    error: {},
    moviesData: [],
    lastFoundMovies: []
  } as IMoviesDataSliceState,
  reducers: {
    getMoviesDataSuccess: (state, action: PayloadAction<Array<TMovieItem>>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        moviesData: action.payload
      }
    },
    getMoviesData: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getMoviesDataFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    },
    setLastFoundMovies: (state, action: PayloadAction<Array<TMovieItem>>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFoundMovies: action.payload
      }
    }
  }
})

export default moviesDataSlice.reducer

export const {
  getMoviesDataSuccess,
  getMoviesData,
  getMoviesDataFailed,
  setLastFoundMovies
} = moviesDataSlice.actions

export const moviesDataActions: IMoviesDataActions = {
  getMoviesDataSuccess: getMoviesDataSuccess,
  getMoviesData: getMoviesData,
  getMoviesDataFailed: getMoviesDataFailed,
  setLastFoundMovies: setLastFoundMovies
}