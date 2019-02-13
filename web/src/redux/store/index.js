import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from "../reducers/index";

const store = createStore(
    combineReducers({
        rootReducer
    }),
    {},
    applyMiddleware(logger)
);
export default store