import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUserDataState} from '../types/index';
import {TErrorState, TUser} from '../types/data'
import {IUserDataActions} from '../types/action-type';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    isLoading: false,
    hasError: false,
    error: {},
    userData: {
      email: '',
      name: ''
    },
  } as IUserDataState,
  reducers: {
    setUserData: (state, action: PayloadAction<TUser>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        userData: action.payload
      }
    },
    getUserData: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getUserDataFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    },
    updateUserData: (state, action: PayloadAction<TUser>) => {
      return {
        ...state,
        isLoading: false,
        userData: {
          ...state.userData,
          name: action.payload.name,
          email: action.payload.email
        }
      }
    },
    deleteUserData: (state) => {
      return {
        ...state,
        userData: {
          email: '',
          name: ''
        }
      }
    },
  }
})

export default userDataSlice.reducer

export const {
  setUserData,
  getUserData,
  getUserDataFailed,
  updateUserData,
  deleteUserData
} = userDataSlice.actions

export const userDataActions: IUserDataActions = {
  setUserData: setUserData,
  getUserData: getUserData,
  getUserDataFailed: getUserDataFailed,
  updateUserData: updateUserData,
  deleteUserData: deleteUserData
}