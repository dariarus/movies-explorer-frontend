import React, {FunctionComponent} from 'react';
import {LandingSection} from '../landing-section/landing-section';

import aboutProjectStyles from './about-project.module.css';
import {LandingArticle} from '../landing-article/landing-article';
import {TSection} from '../../services/types/data';

export const AboutProject = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <LandingSection header="О проекте" sectionMod={false} ref={ref}>
      <div className={aboutProjectStyles['article-wrapper']}>
        <LandingArticle heading="Дипломный проект включал 5 этапов"
                        content="Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."/>
        <LandingArticle heading="На выполнение диплома ушло 5 недель"
                        content="У каждого этапа были мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."/>
      </div>
      <div className={aboutProjectStyles.statistics}>
        <div
          className={`${aboutProjectStyles['statistics__section']} ${aboutProjectStyles['statistics__section_back']}`}>
          <div className={`${aboutProjectStyles['statistics__scale']} ${aboutProjectStyles['statistics__scale_back']}`}>
            <p
              className={`${aboutProjectStyles['statistics__scale-text']} ${aboutProjectStyles['statistics__scale-text_back']}`}>
              1 неделя
            </p>
          </div>
          <p
            className={`${aboutProjectStyles['statistics__scale-text']} ${aboutProjectStyles['statistics__scale-text_secondary']}`}>
            Back-end
          </p>
        </div>

        <div
          className={`${aboutProjectStyles['statistics__section']} ${aboutProjectStyles['statistics__section_front']}`}>
          <div
            className={`${aboutProjectStyles['statistics__scale']} ${aboutProjectStyles['statistics__scale_front']}`}>
            <p
              className={`${aboutProjectStyles['statistics__scale-text']} ${aboutProjectStyles['statistics__scale-text_front']}`}>
              4 недели
            </p>
          </div>
          <p
            className={`${aboutProjectStyles['statistics__scale-text']} ${aboutProjectStyles['statistics__scale-text_secondary']}`}>
            Front-end
          </p>
        </div>
      </div>
    </LandingSection>
  )
})