import React, {FunctionComponent} from 'react';
import {TProjectLink} from '../../services/types/data';

import projectLinkStyles from './project-link.module.css';
import arrow from '../../images/arrow.svg';

export const ProjectLink: FunctionComponent<TProjectLink> = (props) => {
  return (
    <>
      <div className={projectLinkStyles.link}>
        <h4 className={projectLinkStyles['link__name']}>{props.header}</h4>
        <a href={props.link} className={projectLinkStyles['link__icon']} target="_blank">
          <img src={arrow} alt="Ссылка на сайт портфолио" className={projectLinkStyles['link__icon-image']}/>
        </a>
      </div>
      {
        props.needSeparator &&
        <hr className={projectLinkStyles.separator}/>
      }
    </>

  )
}