import React, {FunctionComponent, useState} from 'react';
import addFilmButtonStyles from './add-film-button.module.css';

export const AddFilmButton: FunctionComponent = () => {
  const [buttonIsActive, setButtonIsActive] = useState<boolean>(false);

  return (
    <>
      {
        buttonIsActive
          ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_active']}`}
                    onClick={() => {
                      setButtonIsActive(!buttonIsActive)
                    }}></button>
          : <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_default']}`}
                    onClick={() => {
                      setButtonIsActive(!buttonIsActive)
                    }}>Сохранить</button>
      }
    </>
  )

}