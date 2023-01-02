import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPopupState} from '../types';
import {IPopupActions} from '../types/action-type';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    popupTypesToOpen: {}
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
        popupTypesToOpen: {}
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