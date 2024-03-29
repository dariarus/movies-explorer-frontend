import React, {FunctionComponent} from 'react';
import {Promo} from '../../components/promo/promo';
import {AboutProject} from '../../components/about-project/about-project';
import {Techs} from '../../components/techs/techs';
import {AboutMe} from '../../components/about-me/about-me';
import {TCombinedRef} from '../../services/types/props-types';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';

export const Main: FunctionComponent = () => {
  const aboutProjectRef = React.useRef<HTMLDivElement>(null);
  const techsRef = React.useRef<HTMLDivElement>(null);
  const aboutMeRef = React.useRef<HTMLDivElement>(null);

  const combinedRef: TCombinedRef= {
    aboutProjectRef: aboutProjectRef,
    techsRef: techsRef,
    aboutMeRef: aboutMeRef
  }

  return (
    <>
      {/*<Header/>*/}
      <Promo refs={combinedRef}/>
      <AboutProject ref={aboutProjectRef}/>
      <Techs ref={techsRef}/>
      <AboutMe ref={aboutMeRef}/>
      {/*<Footer/>*/}
    </>
  )
}