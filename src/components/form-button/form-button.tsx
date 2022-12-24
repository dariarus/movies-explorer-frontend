import React, {FunctionComponent} from 'react';

import formButtonStyles from './form-button.module.css';

import {TFormButton} from '../../services/types/data';

export const FormButton: FunctionComponent<TFormButton> = (props) => {
  return (
    <button type="submit"
            className={props.needSearchMod
              ? `${formButtonStyles.button} ${formButtonStyles['button_search']}`
              : `${formButtonStyles.button}`}>
      {props.name}
    </button>
  )
}