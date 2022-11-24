import React, {FunctionComponent} from 'react';

import moreMoviesButtonStyles from './more-movies-button.module.css';

export const MoreMoviesButton: FunctionComponent = () => {
  return (
    <button className={moreMoviesButtonStyles.button}>Еще</button>
  )
}