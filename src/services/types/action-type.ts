import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState, TMovieItem} from './data';

export interface IMoviesDataActions {
  getMoviesDataSuccess: ActionCreatorWithPayload<Array<TMovieItem>>,
  getMoviesData: ActionCreatorWithoutPayload<string>,
  getMoviesDataFailed: ActionCreatorWithPayload<TErrorState>,
  setLastFoundMovies: ActionCreatorWithPayload<Array<TMovieItem>>
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

type TMoviesActions =
  IMoviesDataActions

type TSearchFormActions =
  ISearchFormActions

type TPopupActions =
  IPopupActions

export type TApplicationActions =
  TMoviesActions
  | TSearchFormActions
  | TPopupActions