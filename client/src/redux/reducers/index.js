import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { fileReducer } from './fileReducer';
import { userReducer } from './userReducer';
import { uploadReducer } from './uploadReducer';
import { appReducer } from './appReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
