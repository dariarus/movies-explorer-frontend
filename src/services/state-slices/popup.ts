import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPopupState} from '../types';
import {IPopupActions} from '../types/action-type';
import {TError, TErrorState, TMovieItem, TSavedMovieItem} from '../types/data';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    errorType: {
      show: false,
      message: undefined
    },
    notFoundMoviesType: {
      show: false,
    }
  } as IPopupState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<{ [index: string]: boolean }>) => {
      return {
        ...state,
        popupTypesToOpen: action.payload
      }
    },
    setIsClosed: (state) => {
      return {
        ...state,
        popupTypesToOpen: {},
        errorType: {
          show: false,
          message: undefined
        },
        notFoundMovies: {
          show: false
        }
      }
    },
    getLastFoundMoviesToOpenPopup: (state, action: PayloadAction<Array<TMovieItem | TSavedMovieItem>>) => {
      const isFoundedMovies = action.payload && action.payload.length > 0;
      return {
        ...state,
        notFoundMoviesType: {
          ...state.notFoundMoviesType,
          show: !isFoundedMovies
        }
      }
    },
    getAppErrorToOpenPopup: (state, action: PayloadAction<TError>) => {
      if (state.errorType.show) {
        return state
      }
      const doNotShowPopup = action.payload.error?.message === 'Ошибка авторизации'
      return {
        ...state,
        errorType: {
          ...state.errorType,
          show: !doNotShowPopup,
          message: action.payload.error?.message
        }
      }
    }
  },
})

export default popupSlice.reducer

export const {
  setIsOpen,
  setIsClosed,
  getLastFoundMoviesToOpenPopup,
  getAppErrorToOpenPopup
} = popupSlice.actions

export const popupActions: IPopupActions = {
  setIsOpen: setIsOpen,
  setIsClosed: setIsClosed,
  getLastFoundMoviesToOpenPopup: getLastFoundMoviesToOpenPopup,
  getAppErrorToOpenPopup: getAppErrorToOpenPopup
}