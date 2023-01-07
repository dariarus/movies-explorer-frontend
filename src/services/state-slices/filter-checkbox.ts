import {createSlice} from '@reduxjs/toolkit';
import {IFilterCheckbox} from '../types';
import {IFilterCheckboxActions} from '../types/action-type';

export const filterCheckboxSlice = createSlice({
  name: 'filterCheckbox',
  initialState: {
    isChecked: true
  } as IFilterCheckbox,
  reducers: {
    toggleIsChecked: (state) => {
      return {
        ...state,
        isChecked: !state.isChecked
      }
    }
  }
})

export default filterCheckboxSlice.reducer

export const {
  toggleIsChecked
} = filterCheckboxSlice.actions

export const filterCheckboxActions: IFilterCheckboxActions = {
  toggleIsChecked: toggleIsChecked
}