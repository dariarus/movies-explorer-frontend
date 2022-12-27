import React, {FunctionComponent} from 'react';

import formButtonStyles from './form-button.module.css';

import {TFormButton} from '../../services/types/props-types';

export const FormButton: FunctionComponent<TFormButton & { onClick?: () => void }> = (props) => {
  return (
    <button type="submit"
            className={props.needSearchMod
              ? `${formButtonStyles.button} ${formButtonStyles['button_search']}`
              : `${formButtonStyles.button}`}
            onClick={(e) => {
              e.preventDefault();
              if (props.onClick) {
                props.onClick()
              }
            }}>
      {props.name}
    </button>
  )
}