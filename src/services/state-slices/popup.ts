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
    setIsClosed: (state) => {
      return {
        ...state,
        errorType: {
          show: false,
          message: undefined
        },
        notFoundMoviesType: {
          show: false
        }
      }
    },
    getLastFoundMoviesToOpenPopup: (state, action: PayloadAction<Array<TMovieItem | TSavedMovieItem>>) => {
      if (state.notFoundMoviesType.show) {
        return state
      }
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
  setIsClosed,
  getLastFoundMoviesToOpenPopup,
  getAppErrorToOpenPopup
} = popupSlice.actions

export const popupActions: IPopupActions = {
  setIsClosed: setIsClosed,
  getLastFoundMoviesToOpenPopup: getLastFoundMoviesToOpenPopup,
  getAppErrorToOpenPopup: getAppErrorToOpenPopup
}