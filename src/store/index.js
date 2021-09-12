import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer';
import thunk from 'redux-thunk';
//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer, applyMiddleware(thunk));

export { store };
