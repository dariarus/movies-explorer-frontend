import React, {FunctionComponent} from 'react';

import navStyles from './nav-tab.module.css';
import {LandingNavButton} from '../../landing-nav-button/landing-nav-button';
import {TCombinedRef} from '../../services/types/data';

export const NavTab = React.forwardRef<TCombinedRef>((props, ref) => {
  const {aboutProjectRef,
    techsRef,
    aboutMeRefRef} = ref



   return (
     <nav className={navStyles.navigation}>
       <LandingNavButton tabName="О проекте" ref={aboutProjectRef}/>
       <LandingNavButton tabName="Технологии"/>
       <LandingNavButton tabName="Студент"/>
     </nav>
  )
})