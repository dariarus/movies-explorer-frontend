import React, {FunctionComponent, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';

import profileInputStyles from './profile-input.module.css';

import {IFormInputs, TProfileInput} from '../../services/types/props-types';
import {setOptionsForInputValidation} from '../../utils/functions';;

export const ProfileInput:
  FunctionComponent<TProfileInput & { registerInput: UseFormRegister<IFormInputs>, required: boolean, errors: any }> = (props) => {
  const [value, setValue] = useState(props.value);

  return (
    <div className={props.isLastOfType
      ? `${profileInputStyles['input-wrapper']} ${profileInputStyles['input-wrapper_last-of-type']}`
      : `${profileInputStyles['input-wrapper']}`}>
      <label htmlFor={props.inputName} className={profileInputStyles.label}>{props.label}</label>
      <input type="text" value={value} id={props.inputName}
             className={props.errors[props.inputName]
               ? `${profileInputStyles.input} ${profileInputStyles['input_errored']}`
               : `${profileInputStyles.input} ${profileInputStyles['input_default']}`}
             {...props.registerInput(props.inputName, setOptionsForInputValidation(props.inputName))}
             onChange={event => setValue(event.target.value)}/>
    </div>
  )
}
