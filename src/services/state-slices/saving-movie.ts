import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ISavingMovieState} from '../types';
import {ISavingMovieActions} from '../types/action-type';
import {filterCheckboxSlice} from './filter-checkbox';

export const savingMovieSlice = createSlice({
  name: 'savingMovie',
  initialState: {
    idSavedMoviesArray: [],
    // wasSaved: false
  } as ISavingMovieState,
  reducers: {
    saveMovie: (state, action: PayloadAction<number>) => {
      let copiedIdSavedMoviesArray = [
        ...state.idSavedMoviesArray
      ];
      copiedIdSavedMoviesArray.push(action.payload);

      return {
        ...state,
        idSavedMoviesArray: copiedIdSavedMoviesArray,
        // wasSaved: true
      }
    },
    unsaveMovie: (state, action: PayloadAction<number>) => {
      const copiedIdSavedMoviesArray = [
        ...state.idSavedMoviesArray
      ];
      const index = copiedIdSavedMoviesArray.findIndex(movieId => movieId === action.payload) //id
      if (index > -1) {
        copiedIdSavedMoviesArray.splice(index, 1)
      } else {
        console.log(`Error: Can not find movie with id: ${action.payload}`)
      }

      return {
        ...state,
        idSavedMoviesArray: copiedIdSavedMoviesArray,
        // wasSaved: false
      }
    },
  }
})

export default savingMovieSlice.reducer

export const {
  saveMovie,
  unsaveMovie
} = savingMovieSlice.actions

export const savingMovieActions: ISavingMovieActions = {
  saveMovie: saveMovie,
  unsaveMovie: unsaveMovie
}