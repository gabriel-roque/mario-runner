import { Canvas } from 'canvas';
import { DEFAULT_STATE, GlobalContext } from 'contexts/global';
import { Game } from 'game';
import React, { useState } from 'react';

export const App: React.FC = () => {
  const [state, setState] = useState(DEFAULT_STATE.state);

  function reducer(partial: Record<any, any>) {
    setState({ ...state, ...partial });
  }

  return (
    <React.StrictMode>
      <GlobalContext.Provider value={{ state, setState: reducer }}>
        <Canvas />
        <Game />
      </GlobalContext.Provider>
    </React.StrictMode>
  );
};
