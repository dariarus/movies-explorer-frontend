import React, {FunctionComponent} from 'react';

import formButtonStyles from './form-button.module.css';

import {TFormButton} from '../../services/types/props-types';

export const FormButton: FunctionComponent<TFormButton> = (props) => {
  return (
    <button type="submit"
            disabled={props.disabled}
            className={props.needSearchMod
              ? `${formButtonStyles.button} ${formButtonStyles['button_search']}`
              : `${formButtonStyles.button}`}
            onClick={(e) => {
              e.preventDefault();
              props.onClick()
            }}>
      {props.name}
    </button>
  )
}