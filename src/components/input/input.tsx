import React, {FunctionComponent, useEffect, useState} from 'react';
import {useForm, UseFormRegister} from 'react-hook-form';

import inputStyles from './input.module.css';

import {IFormValues, TInput} from '../../services/types/data';
import {setOptionsForInputValidation} from '../../utils/functions';

export const Input: FunctionComponent<TInput & { registerInput: UseFormRegister<IFormValues>, required: boolean, errors: any }> = (props) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <label className={inputStyles.label}>
        <p className={inputStyles['label__input-name']}>{props.label}</p>
        <input type={props.type}
               className={props.errors[props.inputName]
                 ? `${inputStyles.input} ${inputStyles['input_errored']}`
                 : `${inputStyles.input} ${inputStyles['input_default']}`}
               autoComplete={props.autocomplete}
               {...props.registerInput(props.inputName, setOptionsForInputValidation(props.inputName))} // валидация
               onChange={event => setInputValue(event.target.value)}
        />
      </label>
      {
        props.errors[props.inputName] &&
        <p className={inputStyles['input__error-message']}>{props.errors[props.inputName]?.message}</p>
      }
    </>
  )
}