import React, {FunctionComponent} from 'react';
import {SectionHeader} from '../section-header/section-header';
import {TSection} from '../../services/types/data';

import sectionStyles from './landing-section.module.css';

export const LandingSection: FunctionComponent<TSection> = (props) => {
  return (
    <section className={sectionStyles.section}>
      <SectionHeader header={props.header}/>
      {props.children}
    </section>

  )
}