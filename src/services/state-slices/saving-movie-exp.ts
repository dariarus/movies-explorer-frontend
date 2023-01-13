import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ISavingMovieState} from '../types';
import {TMovieItem} from '../types/data';
import {ISavingMovieActions} from '../types/action-type';
import savingMovie from './saving-movie';
//
// type TSavingMovie = {
//   savingMovie: TMovieItem & {wasSaved?: boolean}
// }
//
// export const savingMovieSlice = createSlice({
//   name: 'savingMovie',
//   initialState: {
//     savingMovie: {}
//   } as TSavingMovie,
//   reducers: {
//     saveMovie: (state, action: PayloadAction<TMovieItem>) => {
//       return {
//         ...state,
//         savingMovie: {
//           ...savingMovie,
//           wasSaved: true
//         }
//       }
//     },
//     unsaveMovie: (state, action: PayloadAction<number>) => {
//       const copiedSavedMoviesArray = [
//         ...state.savedMoviesArray
//       ];
//       const index = copiedSavedMoviesArray.findIndex(movie => movie.id === action.payload) //id
//       if (index > -1) {
//         copiedSavedMoviesArray.splice(index, 1)
//       } else {
//         console.log(`Error: Can not find movie with id: ${action.payload}`)
//       }
//
//       return {
//         ...state,
//         savedMoviesArray: copiedSavedMoviesArray,
//         // wasSaved: false
//       }
//     },
//   }
// })
//
// export default savingMovieSlice.reducer
//
// export const {
//   saveMovie,
//   unsaveMovie
// } = savingMovieSlice.actions
//
// export const savingMovieActions: ISavingMovieActions = {
//   saveMovie: saveMovie,
//   unsaveMovie: unsaveMovie
// }