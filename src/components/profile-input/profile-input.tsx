import React, {FunctionComponent, useState} from 'react';

import profileInputStyles from './profile-input.module.css';

import {TProfileInput} from '../../services/types/data';

export const ProfileInput: FunctionComponent<TProfileInput> = (props) => {
  const [value, setValue] = useState(props.value);

  return (
    <label className={props.isLastOfType
      ? `${profileInputStyles.label} ${profileInputStyles['label_last-of-type']}`
      : `${profileInputStyles.label}`}>
      <p className={profileInputStyles['label__input-name']}>{props.label}</p>
      <input type="text" name={props.label} value={value}
             className={profileInputStyles.input}
             onChange={event => setValue(event.target.value)}/>
    </label>
  )
}
