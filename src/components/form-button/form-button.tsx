import React, {FunctionComponent} from 'react';

import formButtonStyles from './form-button.module.css';

import {TFormButton} from '../../services/types/props-types';
import {useSelector} from '../../services/types/hooks';

export const FormButton: FunctionComponent<TFormButton> = (props) => {
  const {userDataState} = useSelector((state) => {
    return state;
  })

  return (
    <div>
      {
       userDataState.hasError &&
        <p className={formButtonStyles.error}>{`${userDataState.error.message}. Повторите попытку`}</p>
      }
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
    </div>

  )
}