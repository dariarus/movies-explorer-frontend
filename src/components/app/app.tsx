import React from 'react';

import appStyles from './app.module.css';

import { Promo } from '../promo/promo';
import {MainPage} from '../../pages/main-page';

function App() {
  return (
    <div className={appStyles.main}>
        <MainPage/>
        {/*<main className="pt-10 pb-10">*/}
        {/*  <Switch location={background || location}>*/}
    </div>
  );
}

export default App;
