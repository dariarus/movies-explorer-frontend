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
}

export type TInput = {
  label: string,
  type: string,
  isLastOfType: boolean,
  error?: string,
}

export type TProfileInput = {
  label: string,
  isLastOfType: boolean,
  value: string,
}

export type THeaderNavigation = {
  isAuthorized: boolean,
}