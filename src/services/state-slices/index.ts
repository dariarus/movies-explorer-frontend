import {combineReducers} from "redux";

import {moviesDataSlice} from './movies-data';
import {searchFormSlice} from './search-form';

export const rootReducer = combineReducers({
  moviesDataState: moviesDataSlice.reducer,
  searchFormState: searchFormSlice.reducer,
});