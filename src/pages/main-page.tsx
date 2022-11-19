import React, {FunctionComponent} from 'react';
import {Promo} from '../components/promo/promo';
import {AboutProject} from '../components/about-project/about-project';
import {Techs} from '../components/techs/techs';

export const MainPage: FunctionComponent = () => {
  return (
    <>
      <Promo/>
      <AboutProject/>
      <Techs/>
    </>
  )
}