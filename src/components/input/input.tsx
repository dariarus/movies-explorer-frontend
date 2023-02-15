import React, {FunctionComponent, useCallback, useState} from 'react';
import {UseFormRegister,} from 'react-hook-form';

import inputStyles from './input.module.css';

import {IFormInputs, TInput} from '../../services/types/props-types';
import {setOptionsForInputValidation} from '../../utils/functions';
import {inputValuesActions} from '../../services/state-slices/input-values';
import {useAppDispatch, useSelector} from '../../services/types/hooks';

export const Input: FunctionComponent<TInput & {
  registerInput: UseFormRegister<IFormInputs>,
  required: boolean,
  errors: any,
  onChange: (value: string) => void
}> = (props) => {
  const {inputValuesState} = useSelector((state) => {
    return state;
  })

  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const handleSetInputValues = useCallback((value: string) => {
    dispatch(inputValuesActions.setInputValues({
      ...inputValuesState.inputValues,
      [props.inputName]: value
    }))
  }, [inputValuesState.inputValues, props.inputName])

  return (
    <>
      <div className={inputStyles['input-wrapper']}>
        <label htmlFor={props.inputName} className={inputStyles.label}>{props.label}</label>
        <input type={props.type} value={inputValue} id={props.inputName} autoComplete={props.autocomplete}
               disabled={props.isDisabled} className={props.errors[props.inputName]
                 ? `${inputStyles.input} ${inputStyles['input_errored']}`
                 : `${inputStyles.input} ${inputStyles['input_default']}`}
               {...props.registerInput(props.inputName, setOptionsForInputValidation(props.inputName))} // валидация
               onChange={(event) => {
                 setInputValue(event.target.value);
                 handleSetInputValues(event.target.value);
                 props.onChange(event.target.value)
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