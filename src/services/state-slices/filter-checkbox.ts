import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFilterCheckboxState} from '../types';
import {IFilterCheckboxActions} from '../types/action-type';

export const filterCheckboxSlice = createSlice({
  name: 'filterCheckbox',
  initialState: {
    isCheckedOnMoviesPage: false,
    isCheckedOnSavedMoviesPage: false,
    isEmptyMoviesBlock: false,
    isMoviesToShowExist: false,
    lastInputState: undefined,
  } as IFilterCheckboxState,
  reducers: {
    toggleIsCheckedOnMoviesPage: (state) => {
      localStorage.setItem('lastFilterCheckboxStateOnMoviesPage', JSON.stringify(!state.isCheckedOnMoviesPage));

      return {
        ...state,
        isCheckedOnMoviesPage: !state.isCheckedOnMoviesPage
      }
    },
    toggleIsCheckedOnSavedMoviesPage: (state) => {
      localStorage.setItem('lastFilterCheckboxStateOnSavedMoviesPage', JSON.stringify(!state.isCheckedOnSavedMoviesPage));

      return {
        ...state,
        isCheckedOnSavedMoviesPage: !state.isCheckedOnSavedMoviesPage
      }
    },
    setIsCheckedOnMoviesPage(state, action: PayloadAction<boolean>) {
      localStorage.setItem('lastFilterCheckboxStateOnMoviesPage', JSON.stringify(action.payload));

      return {
        ...state,
        isCheckedOnMoviesPage: action.payload
      }
    },
    setIsCheckedOnSavedMoviesPage(state, action: PayloadAction<boolean>) {
      localStorage.setItem('lastFilterCheckboxStateOnSavedMoviesPage', JSON.stringify(action.payload));

      return {
        ...state,
        isCheckedOnSavedMoviesPage: action.payload
      }
    },
    setIsMoviesToShowExist: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        isEmptyMoviesBlock: !action.payload,
        isMoviesToShowExist: action.payload,
      }
    }
  }
})

export default filterCheckboxSlice.reducer

export const {
  toggleIsCheckedOnMoviesPage,
  toggleIsCheckedOnSavedMoviesPage,
  setIsCheckedOnMoviesPage,
  setIsCheckedOnSavedMoviesPage,
  setIsMoviesToShowExist
} = filterCheckboxSlice.actions

export const filterCheckboxActions: IFilterCheckboxActions = {
  toggleIsCheckedOnMoviesPage: toggleIsCheckedOnMoviesPage,
  toggleIsCheckedOnSavedMoviesPage: toggleIsCheckedOnSavedMoviesPage,
  setIsCheckedOnMoviesPage: setIsCheckedOnMoviesPage,
  setIsCheckedOnSavedMoviesPage: setIsCheckedOnSavedMoviesPage,
  setIsMoviesToShowExist: setIsMoviesToShowExist
}