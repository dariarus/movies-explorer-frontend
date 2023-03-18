import React, {FunctionComponent, useState} from 'react';
import ReactDOM from "react-dom";

import popupStyles from './popup.module.css';
import {Overlay} from '../overlay/overlay';

export const Popup: FunctionComponent<{primaryText: string, secondaryText: string, onClose: () => void }> = (props) => {
  const popupRoot = document.getElementById("popup");

  const handleEscClose = React.useCallback((evt: KeyboardEvent): void => {
    if (evt.key === 'Escape' && props.onClose) {
      props.onClose();
    }
  }, [props])

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose)
    return () => {
      document.removeEventListener("keydown", handleEscClose)
    }
  }, [handleEscClose])

  if (popupRoot !== null) {
    return ReactDOM.createPortal(
      (
        <>
          <Overlay onClose={props.onClose}/>
          <div className={popupStyles['popup']}>
            <button type="button" className={popupStyles.cross} onClick={props.onClose}></button>
            <p className={popupStyles.text}>
              {props.primaryText}
            </p>
            <p className={`${popupStyles.text} ${popupStyles['text_secondary']}`}>
              {props.secondaryText}
            </p>
          </div>
        </>
      ),
      popupRoot
    )
  } else return null
}