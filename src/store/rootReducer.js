import { combineReducers } from 'redux';
import loadReducer from './loader/reducer';
import authReducer from './auth/authReducer';
// reducer import
import customizationReducer from './customization/customizationReducer';
//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    customization: customizationReducer,
    loader: loadReducer,
    auth: authReducer
});

export default reducer;
