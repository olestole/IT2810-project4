import React, { useReducer } from 'react';
import AppContext, { initialAppState } from './appContext';
import reducer from './appReducer';

const AppContextProvider = ({ children }: any) => {
  const [appState, appDispatch] = useReducer(reducer, initialAppState);

  return <AppContext.Provider value={{ appState, appDispatch }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
