/**
 * Created by vaibhav on 8/3/18
 */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';


export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
