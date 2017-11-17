import {
    FETCH_ITEMS,
    FETCH_ITEMS_SUCCESS,
    STEP_BACK,
    SET_PATH, NO_SUCH_FOLDER
} from "./disk.constants";

import {getFolderPath} from "./disk.selectors";

const initDiskState = {
    items: {},
    path: 'disk:/',
    loading: true
};


const lookUp = {
    [FETCH_ITEMS]: (state, action) => {
        return {...state, loading: true};
    },
    [FETCH_ITEMS_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            items: action.payload.entities.items
        };
    },
    [SET_PATH]: (state, action) => {
        return {...state, path: action.payload};
    },
    [NO_SUCH_FOLDER]: (state, action) => {
        return {...state, items: action.payload, loading: false};
    },
    [STEP_BACK]: (state, action) => {
        return {...state, path: getFolderPath(state.path)};
    },
};

export function diskReducer( state = initDiskState, action){
    return lookUpMatcher(lookUp, state, action)
}

export function lookUpMatcher(lookUp, state, action){
    return lookUp[action.type]
        ? lookUp[action.type](state, action)
        : state;
}
