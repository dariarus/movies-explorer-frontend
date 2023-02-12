import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TError, TErrorState, TMovieItem, TSavedMovieItem, TUser} from './data';

export interface IMoviesDataActions {
  getMoviesDataSuccess: ActionCreatorWithPayload<Array<TMovieItem>>,
  getMoviesData: ActionCreatorWithoutPayload<string>,
  getMoviesDataFailed: ActionCreatorWithPayload<TErrorState>,
  setLastFoundMovies: ActionCreatorWithPayload<Array<TMovieItem>>
}

export interface ISavedMoviesDataActions {
  getSavedMoviesDataSuccess: ActionCreatorWithPayload<Array<TSavedMovieItem>>,
  getSavedMoviesData: ActionCreatorWithoutPayload<string>,
  getSavedMoviesDataFailed: ActionCreatorWithPayload<TErrorState>,
  setLastFoundSavedMovies: ActionCreatorWithPayload<Array<TSavedMovieItem>>,
  deleteLastFoundSavedMovie: ActionCreatorWithPayload<number>,
  saveLastFoundSavedMoviesToLocalStorage: ActionCreatorWithoutPayload<string>,
}

export interface IErrorsActions {
  setLastError: ActionCreatorWithPayload<TError>,
}

export interface ISearchFormActions {
  setIsSearching: ActionCreatorWithoutPayload<string>,
  setValue: ActionCreatorWithPayload<string>,
  setLastSearchedValue: ActionCreatorWithPayload<string>,
  setLastSearchedValueOfSaved: ActionCreatorWithPayload<string>,
  setIsSearchingSuccess: ActionCreatorWithoutPayload<string>,
  setSearchingIsFailed: ActionCreatorWithoutPayload<string>
}

export interface IPopupActions {
  setIsOpen: ActionCreatorWithPayload<{ [index: string]: boolean }>,
  setIsClosed: ActionCreatorWithoutPayload<string>,
  getLastFoundMoviesToOpenPopup: ActionCreatorWithPayload<Array<TMovieItem | TSavedMovieItem>>,
  getAppErrorToOpenPopup: ActionCreatorWithPayload<TError>,
}

export interface IFilterCheckboxActions {
  toggleIsChecked: ActionCreatorWithoutPayload<string>,
  setIsChecked: ActionCreatorWithPayload<boolean>
}

export interface IInputValuesActions {
  setInputValues: ActionCreatorWithPayload<{ [index: string]: string }>,
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