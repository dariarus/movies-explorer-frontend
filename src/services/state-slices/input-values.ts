import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IInputValuesState, IUserDataState} from '../types';
import {TInputValues, TUser} from '../types/data';
import {IInputValuesActions, IUserDataActions} from '../types/action-type';
import {userDataSlice} from './user-data';

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