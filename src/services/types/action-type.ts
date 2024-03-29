import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TError, TErrorState, TMovieItem, TSavedMovieItem, TUser} from './data';

export interface IMoviesDataActions {
  getMoviesDataSuccess: ActionCreatorWithPayload<Array<TMovieItem>>,
  getMoviesData: ActionCreatorWithoutPayload<string>,
  getMoviesDataFailed: ActionCreatorWithPayload<TErrorState>,
  setLastFoundMovies: ActionCreatorWithPayload<Array<TMovieItem>>,
  filterLastFoundMovies: ActionCreatorWithPayload<string>,
  resetMoviesState: ActionCreatorWithoutPayload<string>,
}

export interface ISavedMoviesDataActions {
  getSavedMoviesDataSuccess: ActionCreatorWithPayload<Array<TSavedMovieItem>>,
  getSavedMoviesData: ActionCreatorWithoutPayload<string>,
  getSavedMoviesDataFailed: ActionCreatorWithPayload<TErrorState>,
  addLikedMovieToSavedMovies: ActionCreatorWithPayload<TSavedMovieItem>,
  filterLastFoundSavedMovies: ActionCreatorWithPayload<string>,
  deleteLastFoundSavedMovie: ActionCreatorWithPayload<number>,
  resetSavedMoviesState: ActionCreatorWithoutPayload<string>
}

export interface IErrorsActions {
  setLastError: ActionCreatorWithPayload<TError>,
}

export interface ISearchFormActions {
  setIsSearching: ActionCreatorWithoutPayload<string>,
  setValue: ActionCreatorWithPayload<string>,
  setLastSearchedValue: ActionCreatorWithPayload<string>,
  setLastSearchedValueOfSaved: ActionCreatorWithPayload<string>,
  deleteLastSearchedValues: ActionCreatorWithoutPayload<string>,
  setIsSearchingSuccess: ActionCreatorWithoutPayload<string>,
  setSearchingIsFailed: ActionCreatorWithoutPayload<string>
}

export interface IPopupActions {
  getLastFoundMoviesToOpenPopup: ActionCreatorWithPayload<Array<TMovieItem | TSavedMovieItem>>,
  getAppErrorToOpenPopup: ActionCreatorWithPayload<TError>,
  setIsClosed: ActionCreatorWithoutPayload<string>
}

export interface IFilterCheckboxActions {
  toggleIsCheckedOnMoviesPage: ActionCreatorWithoutPayload<string>,
  toggleIsCheckedOnSavedMoviesPage: ActionCreatorWithoutPayload<string>,
  setIsCheckedOnMoviesPage: ActionCreatorWithPayload<boolean>,
  setIsCheckedOnSavedMoviesPage: ActionCreatorWithPayload<boolean>,
  setIsMoviesToShowExist: ActionCreatorWithPayload<boolean>
}

export interface IInputValuesActions {
  setInputValues: ActionCreatorWithPayload<{ [index: string]: string }>,
  clearPassword: ActionCreatorWithoutPayload<string>,
  clearInputValuesState: ActionCreatorWithoutPayload<string>
}

export interface IUserDataActions {
  setUserData: ActionCreatorWithPayload<TUser>,
  setIsAuthorized: ActionCreatorWithPayload<boolean>,
  getUserData: ActionCreatorWithoutPayload<string>,
  getUserDataFailed: ActionCreatorWithPayload<TErrorState>,
  updateUserData: ActionCreatorWithPayload<TUser>,
  deleteUserData: ActionCreatorWithoutPayload<string>,
}

type TMoviesDataActions =
  IMoviesDataActions

type TSavedMoviesDataActions =
  ISavedMoviesDataActions

type TErrorsActions =
  IErrorsActions

type TSearchFormActions =
  ISearchFormActions

type TPopupActions =
  IPopupActions

type TFilterCheckboxActions =
  IFilterCheckboxActions

type TInputValuesActions =
  IInputValuesActions

type TUserDataActions =
  IUserDataActions

export type TApplicationActions =
  TMoviesDataActions
  | TSavedMoviesDataActions
  | TErrorsActions
  | TSearchFormActions
  | TPopupActions
  | TFilterCheckboxActions
  | TInputValuesActions
  | TUserDataActions