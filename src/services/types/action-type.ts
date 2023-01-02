import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState, TMovieItem} from './data';

export interface IMoviesDataActions {
  getMoviesDataSuccess: ActionCreatorWithPayload<Array<TMovieItem>>,
  getMoviesData: ActionCreatorWithoutPayload<string>,
  getMoviesDataFailed: ActionCreatorWithPayload<TErrorState>
}

export interface ISearchFormActions {
  setIsSearching: ActionCreatorWithoutPayload<string>,
  setValue: ActionCreatorWithPayload<string>,
  setIsSearchingSuccess: ActionCreatorWithoutPayload<string>
  // setSearchingIsFailed: ActionCreatorWithPayload<TErrorState>
}

export interface IPopupActions {
  setIsOpen: ActionCreatorWithoutPayload<string>,
  setIsClosed: ActionCreatorWithoutPayload<string>
}

type TMoviesActions =
  IMoviesDataActions

type TSearchFormAction =
  ISearchFormActions

export type TApplicationActions =
  TMoviesActions
| TSearchFormAction