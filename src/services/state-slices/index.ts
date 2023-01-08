import {combineReducers} from "redux";

import {moviesDataSlice} from './movies-data';
import {searchFormSlice} from './search-form';
import {popupSlice} from './popup';
import {filterCheckboxSlice} from './filter-checkbox';
import {savedMoviesDataSlice} from './saved-movies-data';

export const rootReducer = combineReducers({
  moviesDataState: moviesDataSlice.reducer,
  savedMoviesDataState: savedMoviesDataSlice.reducer,
  searchFormState: searchFormSlice.reducer,
  popupState: popupSlice.reducer,
  filterCheckboxState: filterCheckboxSlice.reducer
});