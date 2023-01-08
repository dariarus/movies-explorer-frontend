import {createSlice} from '@reduxjs/toolkit';
import {ISavedMovieState} from '../types';

export const savedMovieSlice = createSlice({
  name: 'savedMoviesData',
  initialState: {
    wasSaved: false,
  } as ISavedMovieState,
  reducers: {
    saveMovie: (state) => {
      return {
        ...state,
        wasSaved: true
      }
    },
  }
})