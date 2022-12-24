import React, {FunctionComponent, useEffect, useState} from 'react';
import {useForm, UseFormRegister} from 'react-hook-form';

import inputStyles from './input.module.css';

import {IFormValues, TInput} from '../../services/types/data';
import {setOptionsForInputValidation} from '../../utils/functions';

export const Input: FunctionComponent<TInput & { registerInput: UseFormRegister<IFormValues>, required: boolean, errors: any }> = (props) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <div className={inputStyles['input-wrapper']}>
          <label htmlFor={props.inputName} className={inputStyles.label}>{props.label}</label>
          <input type={props.type} id={props.inputName}
                 className={props.errors[props.inputName]
                   ? `${inputStyles.input} ${inputStyles['input_errored']}`
                   : `${inputStyles.input} ${inputStyles['input_default']}`}
                 autoComplete={props.autocomplete}
                 {...props.registerInput(props.inputName, setOptionsForInputValidation(props.inputName))} // валидация
                 onChange={event => setInputValue(event.target.value)}
          />
      </div>
      {
        props.errors[props.inputName] &&
        <p className={inputStyles['input__error-message']}>{props.errors[props.inputName]?.message}</p>
      }
    </>
  )
}