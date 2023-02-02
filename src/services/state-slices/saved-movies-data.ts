import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISavedMoviesDataState} from '../types';
import {TErrorState, TSavedMovieItem} from '../types/data';
import {ISavedMoviesDataActions} from '../types/action-type';

export const savedMoviesDataSlice = createSlice({
  name: 'savedMoviesData',
  initialState: {
    isLoading: false,
    hasError: false,
    error: {},
    savedMoviesData: [],
    savingMovie: {},
    lastFoundSavedMovies: []
  } as ISavedMoviesDataState,
  reducers: {
    getSavedMoviesDataSuccess: (state, action: PayloadAction<Array<TSavedMovieItem>>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        savedMoviesData: action.payload
      }
    },
    getSavedMoviesData: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getSavedMoviesDataFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    },
    setLastFoundSavedMovies: (state, action: PayloadAction<Array<TSavedMovieItem>>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFoundSavedMovies: action.payload
      }
    },
  }
})

export default savedMoviesDataSlice.reducer

export const {
  getSavedMoviesDataSuccess,
  getSavedMoviesData,
  getSavedMoviesDataFailed,
  setLastFoundSavedMovies
} = savedMoviesDataSlice.actions

export const savedMoviesDataActions: ISavedMoviesDataActions = {
  getSavedMoviesDataSuccess: getSavedMoviesDataSuccess,
  getSavedMoviesData: getSavedMoviesData,
  getSavedMoviesDataFailed: getSavedMoviesDataFailed,
  setLastFoundSavedMovies: setLastFoundSavedMovies
}