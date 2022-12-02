import React, {FunctionComponent, useState} from 'react';

import moreMoviesButtonStyles from './more-movies-button.module.css';

export const MoreMoviesButton: FunctionComponent<{onClick: () => void, disabled: boolean}> = (props) => {
  return (
    <button className={moreMoviesButtonStyles.button} onClick={props.onClick} disabled={props.disabled}>Еще</button>
  )
}