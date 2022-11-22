import React, {FunctionComponent} from 'react';
import {LandingSection} from '../landing-section/landing-section';

import myPortrait from '../../images/my-portrait.jpg';

import aboutMeStyles from './about-me.module.css';
import {Portfolio} from '../portfolio/portfolio';

export const AboutMe = React.forwardRef<HTMLDivElement>((props, ref)   => {
  return (
    <LandingSection header="Студент" sectionMod={false} ref={ref}>
      <article className={aboutMeStyles.article}>
        <div>
          <h3 className={`${aboutMeStyles.text} ${aboutMeStyles['text_heading']}`}>Дарья</h3>
          <p
            className={`${aboutMeStyles.text} ${aboutMeStyles['text_subheading']}`}>Фронтенд-разработчик,
            29 лет</p>
          <p className={`${aboutMeStyles.text} ${aboutMeStyles['text_paragraph']}`}>Люблю кино,
            видеоигры и рисование, обожаю животных. Мой родной город - Москва. Здесь я закончила
            медицинский институт. Проработав по специальности фармация 5 лет,
            решила сменить профессию и выбрала для себя веб-разработку. Новая специальность нравится тем, что она
            насыщена творчеством и свободой выбора подхода к решению задач. По окончании курса планирую устроиться на
            работу в компанию и начать получать коммерческий опыт, чтобы в последствие вырасти в первоклассного
            специалиста.</p>
          <a href="https://github.com/dariarus" className={aboutMeStyles['article__link']} target="_blank">GitHub</a>
        </div>
        <img className={aboutMeStyles['article__image']} src={myPortrait} alt="Портрет автора"/>
      </article>
      <Portfolio/>
    </LandingSection>
  )
})