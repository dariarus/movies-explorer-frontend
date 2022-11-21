import React from 'react';

export type TSection = {
  header: string,
  sectionMod: boolean,
  children: React.ReactNode
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