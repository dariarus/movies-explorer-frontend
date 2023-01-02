import {createSlice} from '@reduxjs/toolkit';
import {IPopupState} from '../types';
import {IPopupActions} from '../types/action-type';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isOpen: false,
  } as IPopupState,
  reducers: {
    setIsOpen: (state) => {
      return {
        ...state,
        isOpen: true,
      }
    },
    setIsClosed: (state) => {
      return {
        ...state,
        isOpen: false,
      }
    }
  }
})

export default popupSlice.reducer

export const {
  setIsOpen,
  setIsClosed,
} = popupSlice.actions

export const popupActions: IPopupActions = {
  setIsOpen: setIsOpen,
  setIsClosed: setIsClosed
}