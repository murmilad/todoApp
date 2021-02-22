import {createStore} from 'redux'
import {addContact} from './actions'
import reducer from './reducer'


  const store = createStore(reducer)
/*
  store.dispatch(updateUser({foo : 'foo'}))
  store.dispatch(updateUser({bar : 'bar'}))
  store.dispatch(updateUser({foo : 'baz'}))
*/
  store.dispatch(addContact({name : 'la h', phone: '25343664565'}))
  store.dispatch(addContact({name : 'la h', phone: '25343664565'}))
  store.dispatch(addContact({name : 'fdl sdfklj', phone: '085035830'}))

  console.log(store.getState())
  
 export default store;