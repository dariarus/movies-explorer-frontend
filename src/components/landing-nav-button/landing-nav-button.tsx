import React, {ForwardedRef, useEffect, useRef} from 'react';

import navButtonStyles from './landing-nav-button.module.css';

import {useForwardRef} from '../../utils/functions';

export const LandingNavButton = React.forwardRef<HTMLDivElement, { tabName: string }>((props, ref) => {
  const sectionRef = useForwardRef<HTMLDivElement>(ref);

  const scrollToSection = (element: HTMLDivElement | null): void => {
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }

  return (
    <button type="button" className={navButtonStyles.button} onClick={() => {
      scrollToSection(sectionRef.current);
    }}>
      <p className={navButtonStyles['button__name']}>{props.tabName}</p>
    </button>
  )
})

