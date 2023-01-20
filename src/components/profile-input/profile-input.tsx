import React, {FunctionComponent, useCallback, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';

import profileInputStyles from './profile-input.module.css';

import {IFormInputs, TProfileInput} from '../../services/types/props-types';
import {setOptionsForInputValidation} from '../../utils/functions';
import {inputValuesActions} from '../../services/state-slices/input-values';
import {useAppDispatch, useSelector} from '../../services/types/hooks';

;

export const ProfileInput:
  FunctionComponent<TProfileInput & { registerInput: UseFormRegister<IFormInputs>, required: boolean, errors: any }> = (props) => {
  const {inputValuesState} = useSelector((state) => {
    return state;
  })
  const [value, setValue] = useState(props.value);

  const dispatch = useAppDispatch();

  const handleSetInputValues = useCallback((value: string) => {
    dispatch(inputValuesActions.setInputValues({
      ...inputValuesState.inputValues,
      [props.inputName]: value
    }))
  }, [inputValuesState.inputValues, props.inputName])

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
             onChange={(event) => {
               setValue(event.target.value);
               handleSetInputValues(event.target.value);
             }}/>
    </div>
  )
}
