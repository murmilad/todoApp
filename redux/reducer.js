import {combineReducers} from 'redux'
import {START_LOADING, STOP_LOADING, ADD_DATA, UPDATE_USER, UPDATE_CONTACT, SET_LOGGED_IN, LOG_IN_SENT, LOG_IN_REJECTED, LOG_IN_FULFILLED} from './actions'

  

 const merge = (prev, next) => Object.assign({}, prev, next )

 const galleryReducer = (state = {}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, loading: true};
    case STOP_LOADING:
      return {...state, loading: false};
    case ADD_DATA:
      return {...state, records:[...action.value]};
    default:
      return state
  }
      
 };

 const artReducer = (state = [], action) => {
  if (action.type === UPDATE_ART) return [...state, action.payload]
  return state
 }
 
 const userReducer = (state = {}, action) => {
   switch (action.type) {
     case UPDATE_USER:
      return merge(state, action.payload)
     case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
     case LOG_IN_FULFILLED:
      return merge(state, {token: action.payload})
     case LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload})
      
     default:
      return state
   }
 }
 const isLoggedInReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
     return action.payload
    default:
     return state
  }
}
const reducer = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
  art:artReducer,
  isLoggedIn: isLoggedInReducer,
})

 export default reducer
  