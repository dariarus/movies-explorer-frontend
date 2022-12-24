import React, {FunctionComponent} from 'react';
import {SectionHeader} from '../section-header/section-header';
import {TSection} from '../../services/types/data';

import sectionStyles from './landing-section.module.css';

export const LandingSection = React.forwardRef<HTMLDivElement, TSection>((props, ref) => {
  return (
    <section
      className={props.sectionMod ? `${sectionStyles.section} ${sectionStyles['section_techs']}` : `${sectionStyles.section}`}
      ref={ref}>
      <div className={sectionStyles['section__content-wrapper']}>
        <SectionHeader header={props.header}/>
        {props.children}
      </div>
    </section>

  )
})