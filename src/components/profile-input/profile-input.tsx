import React, {FunctionComponent, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';

import profileInputStyles from './profile-input.module.css';

import {IFormValues, TProfileInput} from '../../services/types/data';
import {setOptionsForInputValidation} from '../../utils/functions';
import inputStyles from '../input/input.module.css';

export const ProfileInput:
  FunctionComponent<TProfileInput & { registerInput: UseFormRegister<IFormValues>, required: boolean, errors: any }> = (props) => {
  const [value, setValue] = useState(props.value);

  return (
    <label className={props.isLastOfType
      ? `${profileInputStyles.label} ${profileInputStyles['label_last-of-type']}`
      : `${profileInputStyles.label}`}>
      <p className={profileInputStyles['label__input-name']}>{props.label}</p>
      <input type="text" value={value}
             className={props.errors[props.inputName]
               ? `${profileInputStyles.input} ${profileInputStyles['input_errored']}`
               : `${profileInputStyles.input} ${profileInputStyles['input_default']}`}
             {...props.registerInput(props.inputName, setOptionsForInputValidation(props.inputName))}
             onChange={event => setValue(event.target.value)}/>
    </label>
  )
}
