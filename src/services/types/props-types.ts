import React, {RefObject} from 'react';
import {TMovieItem} from './data';

export type TSection = {
  header: string,
  sectionMod: boolean,
  children: React.ReactNode
}

export type TCombinedRef = {
  aboutProjectRef: RefObject<HTMLDivElement>,
  techsRef: RefObject<HTMLDivElement>,
  aboutMeRef: RefObject<HTMLDivElement>
}

export type TLandingArticle = {
  heading: string,
  content: string,
}

export type TProjectLink = {
  header: string,
  link: string,
  needSeparator: boolean,
}

export type TFormButton = {
  name: string,
  needSearchMod: boolean,
  disabled: boolean,
  onClick: () => void
  errorText?: string,
}

export enum ButtonView {
  ADD = 'add',
  ADDED = 'added',
  DELETE = 'delete',
}

export type TButtonView = 'add' | 'added' | 'delete';

export type TMovie = {
  // установка сохраняемого фильма для проброса в кнопку лайка
  itemToSave: TMovieItem,
  name: string
  duration: string,
  image: string,
  buttonView: TButtonView,
}

export type TCredentialsForm = {
  formHeader: string,
  buttonName: string,
  commentQuestion: string,
  commentLink: string,
  commentLinkPath: string
}

export interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

export type TInput = {
  label: string,
  inputName: 'name' | 'email' | 'password',
  type: string,
  isLastOfType: boolean,
  autocomplete: string
}

export type TProfileInput = {
  label: string,
  isLastOfType: boolean,
  inputName: 'name' | 'email' | 'password',
  value: string,
}

export type THeaderNavigation = {
  isAuthorized: boolean,
}

export type TBurgerMenu = {
  onClose: () => void,
  menuIsOpen: boolean,
  children: React.ReactNode
}