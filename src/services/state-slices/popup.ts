import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPopupState} from '../types';
import {IPopupActions} from '../types/action-type';
import {TMovieItem, TSavedMovieItem} from '../types/data';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    popupTypesToOpen: {},
    foundMovies: {
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
        foundMovies: {
          show: false
        }
      }
    },
    getLastFoundMoviesToOpenPopup: (state, action: PayloadAction<Array<TMovieItem | TSavedMovieItem>>) => {
      const isFoundedMovies = action.payload && action.payload.length > 0
      return {
        ...state,
        foundMovies: {
          ...state.foundMovies,
          show: !isFoundedMovies
        }
      }
    }
  },
})

export default popupSlice.reducer

export const {
  setIsOpen,
  setIsClosed,
  getLastFoundMoviesToOpenPopup
} = popupSlice.actions

export const popupActions: IPopupActions = {
  setIsOpen: setIsOpen,
  setIsClosed: setIsClosed,
  getLastFoundMoviesToOpenPopup: getLastFoundMoviesToOpenPopup
}