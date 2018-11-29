import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";


import placesReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placesReducer
});

let composeEnhacers = compose;

if(__DEV__){
    composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhacers(applyMiddleware(thunk)));
};

export default configureStore;