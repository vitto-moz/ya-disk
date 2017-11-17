import {FETCH_ITEMS, FETCH_ITEMS_SUCCESS, STEP_BACK, SET_PATH, NO_SUCH_FOLDER} from "./disk.constants";
import DiskApiService from "../../services/disk.api.service";

export const fetchItemsSuccess = payload => {
     return {
        type: FETCH_ITEMS_SUCCESS,
         payload
     }
};

export const setPath = payload => {
    return {
        type: SET_PATH,
        payload
    }
};

export const fetchItems = () => {
    return { type: FETCH_ITEMS };
};

export const stepBack = () => {
    return { type: STEP_BACK }
};

export const noSuchFolder = () => {
    return {
        type: NO_SUCH_FOLDER,
        payload: NO_SUCH_FOLDER}
};

export const getFolderItems = path => (dispatch) => {
    dispatch(fetchItems());
    return DiskApiService.getFolderItems(path).then(
        items => dispatch(fetchItemsSuccess(items))
    )
    .catch( err => {
        console.error('Error: ', err);
        return dispatch(noSuchFolder())
    })
};