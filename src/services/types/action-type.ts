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
  // setSearchingIsFailed: ActionCreatorWithPayload<TErrorState>
}

type TMoviesActions =
  IMoviesDataActions

type TSearchFormAction =
  ISearchFormActions

export type TApplicationActions =
  TMoviesActions
| TSearchFormAction