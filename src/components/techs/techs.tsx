import React, {FunctionComponent} from 'react';
import {LandingSection} from '../landing-section/landing-section';

import techsStyles from './techs.module.css';
import {TCombinedRef} from '../../services/types/data';

export const Techs = React.forwardRef<HTMLDivElement>((props, ref)  => {
  return (
    <LandingSection header="Технологии" sectionMod={true} ref={ref}>
      <article className={techsStyles.article}>
        <h3 className={`${techsStyles['article__text']} ${techsStyles['article__text_heading']}`}>10 технологий</h3>
        <p className={`${techsStyles['article__text']} ${techsStyles['article__text_paragraph']}`}>
          На курсе веб-разработки мы освоили технологии, некоторые из которых применили в дипломном проекте.
        </p>
        <ul className={techsStyles['article__list']}>
          <li className={techsStyles['article__list-item']}>HTML</li>
          <li className={techsStyles['article__list-item']}>CSS</li>
          <li className={techsStyles['article__list-item']}>JS + TS</li>
          <li className={techsStyles['article__list-item']}>React + Redux</li>
          <li className={techsStyles['article__list-item']}>Git</li>
          <li className={techsStyles['article__list-item']}>Express.js</li>
          <li className={techsStyles['article__list-item']}>MongoDB + Mongoose</li>
          <li className={techsStyles['article__list-item']}>Nest.js</li>
          <li className={techsStyles['article__list-item']}>PostgreSQL</li>
          <li className={techsStyles['article__list-item']}>Тестирование</li>
        </ul>
      </article>
    </LandingSection>
  )
})