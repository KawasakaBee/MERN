import {SHOW_LOADER, HIDE_LOADER} from '../actions/actions';

const initialState = {
    loader: false
}

export function appReducer(store = initialState, action) {
    switch (action.type) {
        case SHOW_LOADER: return {...store, loader: true};
        case HIDE_LOADER: return {...store, loader: false};
        default: return store;
    }
}
