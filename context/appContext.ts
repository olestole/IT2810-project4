import React from 'react';

export type AppState = {
  currentTab: string;
  currentProduct?: string;
};

export type AppAction = { type: 'setCurrentTab'; payload: string };

export const initialAppState: AppState = {
  currentTab: 'Home',
};

export interface AppContextType {
  appState: AppState;
  appDispatch: React.Dispatch<AppAction>;
}

const AppContext = React.createContext({} as AppContextType);
export default AppContext;
