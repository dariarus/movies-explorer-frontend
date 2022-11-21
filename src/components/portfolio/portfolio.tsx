import React, {FunctionComponent} from 'react';
import {ProjectLink} from '../../project-link/project-link';

import portfolioStyles from './portfolio.module.css';

export const Portfolio: FunctionComponent = () => {
  return (
    <article className={portfolioStyles.portfolio}>
      <h3
        className={portfolioStyles['portfolio__header']}>Портфолио</h3>
      <ProjectLink header="Статичный сайт" link="https://dr-how-to-learn.netlify.app/" needSeparator={true}/>
      <ProjectLink header="Адаптивный сайт" link="https://dariarus.github.io/russian-travel/" needSeparator={true}/>
      <ProjectLink header="Приложение на vanilla-JS" link="https://dariarus.github.io/mesto-project/"
                   needSeparator={true}/>
      <ProjectLink header="Одностраничное приложение (SPA) на React + TS"
                   link="https://dariarus.github.io/react-burgerhouse/#/" needSeparator={true}/>
      <ProjectLink header="Визуализация алгоритмов (приложение с покрытием тестами)"
                   link="https://dariarus.github.io/algorithms-visualization/"
                   needSeparator={false}/>
    </article>
  )
}