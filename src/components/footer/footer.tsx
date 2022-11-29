import React, {FunctionComponent} from 'react';

import footerStyles from './footer.module.css';

export const Footer: FunctionComponent = () => {
  return (
    <footer className={footerStyles.footer}>
      <p className={`${footerStyles['footer__text']} ${footerStyles['footer__text_secondary']}`}>Учебный проект Яндекс.Практикум х BeatFilm</p>
      <div className={footerStyles['footer__info-wrapper']}>
        <p className={`${footerStyles['footer__text']} ${footerStyles['footer__text_primary']}`}>© 2022</p>
        <div className={footerStyles['footer__resources-info']}>
          <p className={`${footerStyles['footer__text']} ${footerStyles['footer__text_primary']}`}>Яндекс.Практикум</p>
          <p className={`${footerStyles['footer__text']} ${footerStyles['footer__text_primary']}`}>Github</p>
        </div>
      </div>
    </footer>
  )
}