import {Action, AnyAction} from '@reduxjs/toolkit';
import {ThunkDispatch, ThunkAction} from 'redux-thunk';

import {TErrorState, TMovieItem} from './data';
import {rootReducer} from '../state-slices';
import {TApplicationActions} from './action-type';

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<TApplicationActions>>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export interface IMoviesDataSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  moviesData: Array<TMovieItem>,
  foundMovies: Array<TMovieItem>
}

export interface ISearchFormSliceState {
  value: string,
  isSearching: boolean
}