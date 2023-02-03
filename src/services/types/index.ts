import {Action, AnyAction} from '@reduxjs/toolkit';
import {ThunkDispatch, ThunkAction} from 'redux-thunk';

import {TError, TErrorState, TMovieItem, TSavedMovieItem} from './data';
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
  lastFoundMovies: Array<TMovieItem>
}

export interface ISavedMoviesDataState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  savedMoviesData: Array<TSavedMovieItem>,
  lastFoundSavedMovies: Array<TSavedMovieItem>
}

export interface IErrors {
  errors: Array<TError>
}

export interface ISearchFormSliceState {
  value: string,
  isSearching: boolean,
  hasError: boolean
}

export interface IPopupState {
  popupTypesToOpen: {
    nothingFoundPopupIsOpened?: string,
    errorPopupIsOpened?: string,
    loadingErrorPopupIsOpened?: string
  }
}

export interface IFilterCheckboxState {
  isChecked: boolean
}

export interface IInputValuesState {
  inputValues: {
    email?: string,
    password?: string,
    name?: string
  }
}

export interface IUserDataState {
  isLoading: boolean,
  hasError: boolean,
  success: boolean,
  error: TErrorState,
  isAuthorized: boolean,
  userData: {
    name: string,
    email: string,
    _id?: string,
  },
}