import React, {FunctionComponent} from 'react';
import {Promo} from '../components/promo/promo';
import {AboutProject} from '../components/about-project/about-project';
import {Techs} from '../components/techs/techs';
import {AboutMe} from '../components/about-me/about-me';
import {TCombinedRef} from '../services/types/data';

export const MainPage: FunctionComponent = () => {
  const aboutProjectRef = React.useRef<HTMLDivElement>(null);
  const techsRef = React.useRef<HTMLDivElement>(null);
  const aboutMeRefRef = React.useRef<HTMLDivElement>(null);

  const combinedRef: TCombinedRef | undefined = {
    aboutProjectRef: aboutProjectRef,
    techsRef: techsRef,
    aboutMeRefRef: aboutMeRefRef
  }

  return (
    <>
      <Promo ref={combinedRef}/>
      <AboutProject ref={aboutProjectRef}/>
      {/*<Techs />*/}
      {/*<AboutMe />*/}
    </>
  )
}