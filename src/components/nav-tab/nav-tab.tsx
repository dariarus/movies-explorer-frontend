import React, {FunctionComponent} from 'react';

import navStyles from './nav-tab.module.css';
import {LandingNavButton} from '../../landing-nav-button/landing-nav-button';
import {TCombinedRef} from '../../services/types/data';

export const NavTab = (props: {refs: TCombinedRef}) => {
   return (
     <nav className={navStyles.navigation}>
       <LandingNavButton tabName="О проекте" ref={props.refs.aboutProjectRef}/>
       <LandingNavButton tabName="Технологии" ref={props.refs.techsRef}/>
       <LandingNavButton tabName="Студент" ref={props.refs.aboutMeRef}/>
     </nav>
  )
}