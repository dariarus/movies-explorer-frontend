import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState, TInputValues, TMovieItem, TSavedMovieItem, TUser} from './data';

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
  setLastFoundSavedMovies: ActionCreatorWithPayload<Array<TSavedMovieItem>>
}

export interface ISavingMovieActions {
  saveMovie: ActionCreatorWithPayload<number>,
  unsaveMovie: ActionCreatorWithPayload<number>
}

export interface ISearchFormActions {
  setIsSearching: ActionCreatorWithoutPayload<string>,
  setValue: ActionCreatorWithPayload<string>,
  setIsSearchingSuccess: ActionCreatorWithoutPayload<string>,
  setSearchingIsFailed: ActionCreatorWithoutPayload<string>
}

export interface IPopupActions {
  setIsOpen: ActionCreatorWithPayload<{ [index: string]: boolean }>,
  setIsClosed: ActionCreatorWithoutPayload<string>
}

export interface IFilterCheckboxActions {
  toggleIsChecked: ActionCreatorWithoutPayload<string>
}

export interface IInputValuesActions {
  setInputValues: ActionCreatorWithPayload<{ [index: string]: string }>,
  clearInputValuesState: ActionCreatorWithoutPayload<string>
}

export interface IUserDataActions {
  setUserData: ActionCreatorWithPayload<TUser>,
  setIsAuthorized: ActionCreatorWithoutPayload<string>,
  getUserData: ActionCreatorWithoutPayload<string>,
  getUserDataFailed: ActionCreatorWithPayload<TErrorState>,
  updateUserData: ActionCreatorWithPayload<TUser>,
  deleteUserData: ActionCreatorWithoutPayload<string>,
}

type TMoviesDataActions =
  IMoviesDataActions

type TSavedMoviesDataActions =
  ISavedMoviesDataActions

type TSavingMovieActions =
  ISavingMovieActions

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
  | TSearchFormActions
  | TSavingMovieActions
  | TPopupActions
  | TFilterCheckboxActions
  | TInputValuesActions
  | TUserDataActions