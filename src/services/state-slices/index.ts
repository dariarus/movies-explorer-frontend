import {combineReducers} from "redux";

import {moviesDataSlice} from './movies-data';
import {searchFormSlice} from './search-form';
import {popupSlice} from './popup';
import {filterCheckboxSlice} from './filter-checkbox';

export const rootReducer = combineReducers({
  moviesDataState: moviesDataSlice.reducer,
  searchFormState: searchFormSlice.reducer,
  popupState: popupSlice.reducer,
  filterCheckboxState: filterCheckboxSlice.reducer
});