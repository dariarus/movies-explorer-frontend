import React, {FunctionComponent} from 'react';
import {Promo} from '../components/promo/promo';
import {AboutProject} from '../components/about-project/about-project';

export const MainPage: FunctionComponent = () => {
  return (
    <>
      <Promo/>
      <AboutProject/>
    </>
  )
}