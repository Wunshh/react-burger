import { combineReducers } from 'redux';
import {
    ingredient,
    order,
    modal
} from './reducers';

export const rootReducer = combineReducers({
    ingredient,
    order,
    modal
});
