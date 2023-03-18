import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IErrors} from '../types';
import {IErrorsActions} from '../types/action-type';
import {TError} from '../types/data';

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    lastError: undefined
  } as IErrors,
  reducers: {
    setLastError: (state, action: PayloadAction<TError>) => {
     return {
        ...state,
       lastError: action.payload
      }
    }
  }
})

export default errorsSlice.reducer

export const {
  setLastError
} = errorsSlice.actions

export const errorsActions: IErrorsActions = {
  setLastError: setLastError
}