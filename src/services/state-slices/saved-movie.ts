import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ISavingMovieState} from '../types';
import {TMovieItem} from '../types/data';
import {ISavingMovieActions} from '../types/action-type';

export const savingMovieSlice = createSlice({
  name: 'savingMovie',
  initialState: {
    savingMovie: {},
    wasSaved: false
  } as ISavingMovieState,
  reducers: {
    saveMovie: (state, action: PayloadAction<TMovieItem>) => {
      return {
        ...state,
        savingMovie: action.payload,
        wasSaved: true
      }
    },
  }
})

export default savingMovieSlice.reducer

export const {
  saveMovie
} = savingMovieSlice.actions

export const savingMovieActions: ISavingMovieActions = {
  saveMovie: saveMovie
}