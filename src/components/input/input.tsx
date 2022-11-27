import React, {FunctionComponent, useState} from 'react';

import inputStyles from './input.module.css';

import {TInput} from '../../services/types/data';

export const Input: FunctionComponent<TInput> = (props) => {
  // const [isError, setIsError] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);

  // TODO: сделать валидацию
  return (
    <>
      <label className={inputStyles.label}>
        <p className={inputStyles['label__input-name']}>{props.label}</p>
        <input type={props.type} name={props.label}
               // className={props.lastOfType ? `${inputStyles.input} ${inputStyles['input_last-of-type']}` : `${inputStyles.input}`}/>
               className={inputStyles.input}/>
      </label>
      <p>{props.error}</p>
    </>
  )
}