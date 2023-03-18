import React, {FunctionComponent} from 'react'
import preloaderStyles from './preloader.module.css';

export const Preloader: FunctionComponent = () => {
  return (
    <div className={preloaderStyles.preloader}>
      <div className={preloaderStyles['preloader__container']}>
        <span className={preloaderStyles['preloader__round']}></span>
      </div>
    </div>
  )
};
