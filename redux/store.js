import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {addContact} from './actions'
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer  = persistReducer(persistConfig, reducer)


/*
  const thunk = store => next => action => {
      if (typeof action === 'function') {
        action(store.dispatch)
      } else {
        next(action)
      }
  }
*/
  export const store = createStore(persistedReducer, applyMiddleware(thunk))
  export const persistor = persistStore(store)

/*
  store.dispatch(updateUser({foo : 'foo'}))
  store.dispatch(updateUser({bar : 'bar'}))
  store.dispatch(updateUser({foo : 'baz'}))

  store.dispatch(addContact({name : 'la h', phone: '25343664565'}))
  store.dispatch(addContact({name : 'la h', phone: '25343664565'}))
  store.dispatch(addContact({name : 'fdl sdfklj', phone: '085035830'}))
  store.dispatch(setLoggedIn(false))
  console.log(store.getState())
  */
  
