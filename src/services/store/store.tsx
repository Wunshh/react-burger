import { 
  compose, 
  createStore, 
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { createSocketMiddleware } from '../middleware/socketMiddleware';
import { rootReducer } from '../reducers/rootReducer';
import { WS_URL } from '../../utils/data';
import { wsActions } from '../actions/wsActions'; 

const socketFeedOrdersMiddleware = createSocketMiddleware(WS_URL, wsActions);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketFeedOrdersMiddleware)
);


export const store = createStore(rootReducer, enhancer);

