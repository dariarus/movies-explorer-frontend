import {combineReducers} from "redux";

import {moviesDataSlice} from './movies-data';
import {searchFormSlice} from './search-form';
import {popupSlice} from './popup';
import {filterCheckboxSlice} from './filter-checkbox';
import {savedMoviesDataSlice} from './saved-movies-data';
import {savingMovieSlice} from './saving-movie';
import {userDataSlice} from './user-data';
import {inputValuesSlice} from './input-values';

export const rootReducer = combineReducers({
  moviesDataState: moviesDataSlice.reducer,
  savedMoviesDataState: savedMoviesDataSlice.reducer,
  savingMovieState: savingMovieSlice.reducer,
  searchFormState: searchFormSlice.reducer,
  popupState: popupSlice.reducer,
  filterCheckboxState: filterCheckboxSlice.reducer,
  userDataState: userDataSlice.reducer,
  inputValuesState: inputValuesSlice.reducer
});