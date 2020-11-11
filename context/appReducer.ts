import { AppAction, AppState } from './appContext';

type appReducer = (prevState: AppState, action: AppAction) => AppState;

const reducer: appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'setCurrentTab':
      return {
        ...state,
        currentTab: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
