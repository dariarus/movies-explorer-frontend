import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPopupState} from '../types';
import {IPopupActions} from '../types/action-type';
import {TError, TMovieItem, TSavedMovieItem} from '../types/data';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    notFoundMoviesType: {
      show: false,
    },
    errorType: {
      show: false,
      message: undefined
    },
  } as IPopupState,
  reducers: {
    getLastFoundMoviesToOpenPopup: (state, action: PayloadAction<Array<TMovieItem | TSavedMovieItem>>) => {
      const isFoundMovies = action.payload && action.payload.length > 0;
      return {
        ...state,
        notFoundMoviesType: {
          ...state.notFoundMoviesType,
          show: !isFoundMovies
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
    },
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
  },
})

export default popupSlice.reducer

export const {
  getLastFoundMoviesToOpenPopup,
  getAppErrorToOpenPopup,
  setIsClosed
} = popupSlice.actions

export const popupActions: IPopupActions = {
  getLastFoundMoviesToOpenPopup: getLastFoundMoviesToOpenPopup,
  getAppErrorToOpenPopup: getAppErrorToOpenPopup,
  setIsClosed: setIsClosed
}