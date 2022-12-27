import React, {FunctionComponent} from 'react';
import {TLandingArticle} from '../../services/types/props-types';

import landingArticleStyles from './landing-article.module.css';

export const LandingArticle: FunctionComponent<TLandingArticle> = (props) => {
  return (
    <article>
      <h3 className={landingArticleStyles.heading}>{props.heading}</h3>
      <p className={landingArticleStyles.content}>{props.content}</p>
    </article>
  )
}