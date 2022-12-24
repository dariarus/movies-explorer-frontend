import React, {FunctionComponent, useState} from 'react';
import addFilmButtonStyles from './add-film-button.module.css';
import {ButtonView, TButtonView} from '../../services/types/data';

export const AddFilmButton: FunctionComponent<{buttonView: TButtonView}> = (props) => {
  const [buttonView, setButtonView] = useState<TButtonView>(props.buttonView);

  return (
    <>
      {
        buttonView === ButtonView.added
          ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_active']}`}
                    onClick={() => {
                      setButtonView(ButtonView.add)
                    }}></button>
          : buttonView === ButtonView.add
            ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_default']}`}
                      onClick={() => {
                        setButtonView(ButtonView.added)
                      }}>Сохранить</button>
            : <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_delete']}`}
              // onClick={() => {
            ></button>
      }
    </>
  )

}