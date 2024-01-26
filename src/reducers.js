import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import createnewReducer, { storedKey as storedCreateNewState } from '@pages/CreatePost/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import registerReducer, { storedKey as storedKeyRegister } from '@pages/Register/reducer';
import loginReducer, { storedKey as storedKeyLogin } from '@pages/Login/reducer';
import postDetailReducer, { storedKey as storedPostDetailState } from '@pages/DetailPost/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  home: { reducer: homeReducer, whitelist: storedHomeState },
  register: { reducer: registerReducer, whitelist: storedKeyRegister },
  login: { reducer: loginReducer, whilelist: storedKeyLogin },
  createnew: { reducer: createnewReducer, whitelist: storedCreateNewState },
  postdetail: { reducer: postDetailReducer, whitelist: storedPostDetailState },
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
