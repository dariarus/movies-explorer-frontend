import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISearchFormSliceState} from '../types';
import {ISearchFormActions} from '../types/action-type';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState: {
    value: '',
    lastSearchedValue: '',
    lastSearchedValueOfSaved: '',
    isSearching: false,
    hasError: false
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
    setLastSearchedValue: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        lastSearchedValue: action.payload,
        isSearching: false,
      }
    },
    setLastSearchedValueOfSaved: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        lastSearchedValueOfSaved: action.payload,
        isSearching: false,
      }
    },
    setIsSearchingSuccess: (state) => {
      return {
        ...state,
        isSearching: false,
      }
    },
    setSearchingIsFailed: (state) => {
      return {
        ...state,
        isSearching: false,
        hasError: true
      }
    },
  }
})

export default searchFormSlice.reducer

export const {
  setIsSearching,
  setValue,
  setLastSearchedValue,
  setLastSearchedValueOfSaved,
  setIsSearchingSuccess,
  setSearchingIsFailed
} = searchFormSlice.actions

export const searchFormActions: ISearchFormActions = {
  setIsSearching: setIsSearching,
  setValue: setValue,
  setLastSearchedValue: setLastSearchedValue,
  setLastSearchedValueOfSaved: setLastSearchedValueOfSaved,
  setIsSearchingSuccess: setIsSearchingSuccess,
  setSearchingIsFailed: setSearchingIsFailed,
}