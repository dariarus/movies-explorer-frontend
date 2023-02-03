import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IErrors} from '../types';
import {IErrorsActions} from '../types/action-type';
import {TError} from '../types/data';

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    errors: []
  } as IErrors,
  reducers: {
    getError: (state, action: PayloadAction<TError>) => {
      const copiedErrors = [
        ...state.errors
      ];
      copiedErrors.push(action.payload);

      return {
        ...state,
        errors: copiedErrors
      }
    }
  }
})

export default errorsSlice.reducer

export const {
  getError
} = errorsSlice.actions

export const errorsActions: IErrorsActions = {
  getError: getError
}