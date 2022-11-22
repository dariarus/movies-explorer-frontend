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