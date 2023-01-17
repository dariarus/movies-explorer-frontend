import React, {FunctionComponent, useEffect, useState} from 'react';
import {UseFormRegister,} from 'react-hook-form';

import inputStyles from './input.module.css';

import {IFormInputs, TInput} from '../../services/types/props-types';
import {setOptionsForInputValidation} from '../../utils/functions';
import {inputValuesActions} from '../../services/state-slices/input-values';
import {useAppDispatch} from '../../services/types/hooks';

export const Input: FunctionComponent<TInput & { registerInput: UseFormRegister<IFormInputs>, required: boolean, errors: any }> = (props) => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  return (
    <>
      <div className={inputStyles['input-wrapper']}>
        <label htmlFor={props.inputName} className={inputStyles.label}>{props.label}</label>
        <input type={props.type} value={inputValue} id={props.inputName} autoComplete={props.autocomplete}
               className={props.errors[props.inputName]
                 ? `${inputStyles.input} ${inputStyles['input_errored']}`
                 : `${inputStyles.input} ${inputStyles['input_default']}`}
               {...props.registerInput(props.inputName, setOptionsForInputValidation(props.inputName))} // валидация
               onChange={(event) => {
                 setInputValue(event.target.value);
                 dispatch(inputValuesActions.setInputValues({
                   [props.inputName]: event.target.value
                 }))
               }}
        />
      </div>
      {
        props.errors[props.inputName] &&
        <p className={inputStyles['input__error-message']}>{props.errors[props.inputName]?.message}</p>
      }
    </>
  )
}