import {createStore, applyMiddleware, combineReducers} from 'redux';
import primary from './reducers/primary';
import promiseMiddleware from 'redux-promise-middleware';




export default createStore(
    combineReducers ({
        primary
    }), 
applyMiddleware(promiseMiddleware));