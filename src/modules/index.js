import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { diskReducer } from './disk/disk.reducer';

export default combineReducers({
    routing: routerReducer,
    diskReducer
})