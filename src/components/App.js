import React from 'react';

import GameField from './GameField';
import {GameStartIntro} from './GameStartIntro'

import '../styles/reset.css';
import '../styles/app.css';

const App = () => (
  <div className="pong">
    <GameField />
    <GameStartIntro />
  </div>
);

export default App;
