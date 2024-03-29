import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IMoviesDataSliceState, ISavedMoviesDataState} from '../types/index';
import {TErrorState, TMovieItem} from '../types/data'
import {IMoviesDataActions} from '../types/action-type';
import {getLastFoundMovies} from '../../utils/functions';

const getInitialState = (): IMoviesDataSliceState => {
  return {
    isLoading: false,
    hasError: false,
    moviesDataIsLoaded: false,
    error: {},
    moviesData: [],
    lastFoundMovies: [],
  }
}

export const moviesDataSlice = createSlice({
  name: 'moviesData', // префикс всех экшнов
  initialState: getInitialState(),
  reducers: {
    getMoviesDataSuccess: (state, action: PayloadAction<Array<TMovieItem>>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        moviesDataIsLoaded: true,
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
      localStorage.setItem('lastFoundMovies', JSON.stringify(action.payload));

      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFoundMovies: action.payload
      }
    },
    filterLastFoundMovies: (state, action: PayloadAction<string>) => {
      const filteredMovies = getLastFoundMovies(state.moviesData, action.payload);
      localStorage.setItem('lastFoundMovies', JSON.stringify(filteredMovies));

      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFoundMovies: filteredMovies
      }
    },
    resetMoviesState: (state) => {
      return getInitialState();
    }
  }
})

export default moviesDataSlice.reducer

export const {
  getMoviesDataSuccess,
  getMoviesData,
  getMoviesDataFailed,
  setLastFoundMovies,
  filterLastFoundMovies,
  resetMoviesState
} = moviesDataSlice.actions

export const moviesDataActions: IMoviesDataActions = {
  getMoviesDataSuccess: getMoviesDataSuccess,
  getMoviesData: getMoviesData,
  getMoviesDataFailed: getMoviesDataFailed,
  setLastFoundMovies: setLastFoundMovies,
  filterLastFoundMovies: filterLastFoundMovies,
  resetMoviesState: resetMoviesState
}