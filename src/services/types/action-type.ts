import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState, TMovieItem, TSavedMovieItem} from './data';

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

export type TApplicationActions =
  TMoviesDataActions
  | TSavedMoviesDataActions
  | TSearchFormActions
  | TSavingMovieActions
  | TPopupActions
  | TFilterCheckboxActions