import React, {FunctionComponent} from 'react';
import {TProjectLink} from '../../services/types/data';

import projectLinkStyles from './project-link.module.css';

export const ProjectLink: FunctionComponent<TProjectLink> = (props) => {
  return (
    <>
      <div className={projectLinkStyles.link}>
        <h4 className={projectLinkStyles['link__name']}>{props.header}</h4>
        <a href={props.link} className={projectLinkStyles['link__icon']} target="_blank"></a>
      </div>
      {
        props.needSeparator &&
        <hr className={projectLinkStyles.separator}/>
      }
    </>

  )
}