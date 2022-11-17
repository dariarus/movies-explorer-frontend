import React from 'react';

import appStyles from './app.module.css';

import { Promo } from '../promo/promo';

function App() {
  return (
    <div className={appStyles.main}>
        <Promo/>
        {/*<main className="pt-10 pb-10">*/}
        {/*  <Switch location={background || location}>*/}
    </div>
  );
}

export default App;
