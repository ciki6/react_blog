import thunkMiddleware from 'redux-thunk';
import {routerReducer} from 'react-router-redux';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import resetEnhancer from './enhancer/reset.js';
import {reducer as naveSideReducer, stateKey} from './components/nav-side';

let prod = process.env.NODE_ENV === 'production' ? true : false;

console.log(process);

const middleware = [thunkMiddleware];
const win = window;

const originalReducers = {
	routing: routerReducer,
	[stateKey]: naveSideReducer
}
const reducer = combineReducers(originalReducers);

if (!prod) {
	middleware.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
	resetEnhancer, 
	applyMiddleware(...middleware), 
	(win && win.devToolsExtension && !prod) ? win.devToolsExtension() : (f) => f
)

const store = createStore(reducer, {}, storeEnhancers);
store._reducers = originalReducers;

export default store;