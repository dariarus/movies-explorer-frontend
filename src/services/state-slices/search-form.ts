import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISearchFormSliceState} from '../types';
import {IMoviesDataActions, ISearchFormActions} from '../types/action-type';
import {moviesDataSlice} from './movies-data';
import {TErrorState} from '../types/data';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState: {
    value: '',
    isSearching: false,
    hasError: false,
    error: {}
  } as ISearchFormSliceState,
  reducers: {
    setIsSearching: (state) => {
      return {
        ...state,
        isSearching: true,
      }
    },
    setValue: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        value: action.payload,
        isSearching: false,
      }
    },
    setIsSearchingSuccess: (state) => {
      return {
        ...state,
        isSearching: false,
      }
    },
    // setSearchingIsFailed: (state, action: PayloadAction<TErrorState>) => {
    //   return {
    //     ...state,
    //     isSearching: false,
    //     hasError: true,
    //     error: action.payload
    //   }
    // },
  }
})

export default searchFormSlice.reducer

export const {
  setIsSearching,
  setValue,
} = searchFormSlice.actions

export const searchFormActions: ISearchFormActions = {
  setIsSearching: setIsSearching,
  setValue: setValue
}