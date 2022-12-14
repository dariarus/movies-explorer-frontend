import React, {RefObject} from 'react';

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
  needSearchMod: boolean
}

export enum ButtonView {
  add = 'add',
  added = 'added',
  delete = 'delete',
}

export type TButtonView = 'add' | 'added' | 'delete';

export type TMovie = {
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
  commentLinkPath: string,
}

export interface IFormValues {
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
  // inputId: string
}

export type THeaderNavigation = {
  isAuthorized: boolean,
}

export type TBurgerMenu = {
  onClose: () => void,
  menuIsOpen: boolean,
  children: React.ReactNode
}