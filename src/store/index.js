import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
//-----------------------|| REDUX - MAIN STORE ||-----------------------//

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

//   const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(reducer, applyMiddleware(thunk));

export { store };

// export default () => {
//     let store = createStore(persistedReducer,applyMiddleware(thunk))
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }