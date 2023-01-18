import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IInputValuesState} from '../types';
import {IInputValuesActions} from '../types/action-type';

export const inputValuesSlice = createSlice({
  name: 'inputValues',
  initialState: {
    inputValues: {},
  } as IInputValuesState,
  reducers: {
    setInputValues: (state, action: PayloadAction<{ [index: string]: string }>) => {
      return {
        ...state,
        inputValues: action.payload
      }
    },
  }
})

export default inputValuesSlice.reducer

export const {
  setInputValues
} = inputValuesSlice.actions

export const inputValuesActions: IInputValuesActions = {
  setInputValues: setInputValues
}