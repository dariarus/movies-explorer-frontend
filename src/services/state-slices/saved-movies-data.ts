import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISavedMoviesDataState} from '../types';
import {TErrorState, TSavedMovieItem} from '../types/data';
import {ISavedMoviesDataActions} from '../types/action-type';
import {getLastFoundMovies} from '../../utils/functions';

const getInitialState = (): ISavedMoviesDataState => {
  return {
    isLoading: false,
    hasError: false,
    error: {},
    savedMoviesData: [],
    lastFoundSavedMovies: []
  }
}

export const savedMoviesDataSlice = createSlice({
  name: 'savedMoviesData',
  initialState: getInitialState(),
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
    addLikedMovieToSavedMovies: (state, action: PayloadAction<TSavedMovieItem>) => {
      const copiedSavedMoviesData = [
        ...state.savedMoviesData
      ]
      copiedSavedMoviesData.push(action.payload)

      return {
        ...state,
        isLoading: false,
        hasError: false,
        savedMoviesData: copiedSavedMoviesData
      }
    },
    filterLastFoundSavedMovies: (state, action: PayloadAction<string>) => {
      const filteredMovies = getLastFoundMovies(state.savedMoviesData, action.payload);

      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFoundSavedMovies: filteredMovies
      }
    },
    deleteLastFoundSavedMovie: (state, action: PayloadAction<number>) => {
      const updatedLastSavedFoundMovies = state.lastFoundSavedMovies.filter((movie) => movie.id !== action.payload)
      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFoundSavedMovies: updatedLastSavedFoundMovies
      }
    },
    resetSavedMoviesState: (state) => {
      return getInitialState();
    }
  }
})

export default savedMoviesDataSlice.reducer

export const {
  getSavedMoviesDataSuccess,
  getSavedMoviesData,
  getSavedMoviesDataFailed,
  addLikedMovieToSavedMovies,
  filterLastFoundSavedMovies,
  deleteLastFoundSavedMovie,
  resetSavedMoviesState
} = savedMoviesDataSlice.actions

export const savedMoviesDataActions: ISavedMoviesDataActions = {
  getSavedMoviesDataSuccess: getSavedMoviesDataSuccess,
  getSavedMoviesData: getSavedMoviesData,
  getSavedMoviesDataFailed: getSavedMoviesDataFailed,
  addLikedMovieToSavedMovies: addLikedMovieToSavedMovies,
  filterLastFoundSavedMovies: filterLastFoundSavedMovies,
  deleteLastFoundSavedMovie: deleteLastFoundSavedMovie,
  resetSavedMoviesState: resetSavedMoviesState
}