import React, {FunctionComponent} from 'react';
import {TProjectLink} from '../../services/types/data';

import projectLinkStyles from './project-link.module.css';
import arrow from '../../images/arrow.svg';

export const ProjectLink: FunctionComponent<TProjectLink> = (props) => {
  return (
    <>
      <a href={props.link} className={projectLinkStyles.link} target="_blank">
        <div className={projectLinkStyles['link-wrapper']}>
          <h4 className={projectLinkStyles['link__name']}>{props.header}</h4>
          <img src={arrow} alt="Ссылка на сайт портфолио" className={projectLinkStyles['link__icon-image']}/>

        </div>
      </a>
      {
        props.needSeparator &&
        <hr className={projectLinkStyles.separator}/>
      }
    </>
  )
}