import { createStore } from 'redux';
import reducer from './rootReducer';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer);

export { store };
