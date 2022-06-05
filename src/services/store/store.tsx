import { 
  compose, 
  createStore, 
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import { createSocketMiddleware } from '../middleware/socketMiddleware';
import { rootReducer } from '../reducers/rootReducer';
import { WS_URL } from '../../utils/data';
import { wsActions } from '../actions/wsActions'; 

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, createSocketMiddleware(WS_URL, wsActions)));

export const store = createStore(rootReducer, enhancer);