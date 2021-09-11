import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customization/customizationReducer';
//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    customization: customizationReducer
});

export default reducer;
