import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFilterCheckboxState} from '../types';
import {IFilterCheckboxActions} from '../types/action-type';

export const filterCheckboxSlice = createSlice({
  name: 'filterCheckbox',
  initialState: {
    isChecked: false,
    lastInputState: undefined
  } as IFilterCheckboxState,
  reducers: {
    toggleIsChecked: (state) => {
      localStorage.setItem('lastFilterCheckboxState', JSON.stringify(!state.isChecked));

      return {
        ...state,
        isChecked: !state.isChecked
      }
    },
    setIsChecked(state, action: PayloadAction<boolean>) {
      localStorage.setItem('lastFilterCheckboxState', JSON.stringify(action.payload));

      return {
        ...state,
        isChecked: action.payload
      }
    }
  }
})

export default filterCheckboxSlice.reducer

export const {
  toggleIsChecked,
  setIsChecked
} = filterCheckboxSlice.actions

export const filterCheckboxActions: IFilterCheckboxActions = {
  toggleIsChecked: toggleIsChecked,
  setIsChecked: setIsChecked
}