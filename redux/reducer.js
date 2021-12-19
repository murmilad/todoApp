import {combineReducers} from 'redux'
import * as actions from './actions'

  

 const merge = (prev, next) => Object.assign({}, prev, next )

 const galleryReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.START_GALLERY_LOADING:
      return {...state, loading: true};
    case actions.STOP_GALLERY_LOADING:
      return {...state, loading: false};
    case actions.ADD_GALLERY_DATA:
      return {...state, data:[...action.payload]};
    case actions.ERROR_GALLERY_LOADING:
      return merge(state, {err: action.payload})
        
    default:
      return state
  }
      
 };

 const albumReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.START_ALBUM_LOADING:
      return {...state, loading: true};
    case actions.STOP_ALBUM_LOADING:
      return {...state, loading: false};
    case actions.ADD_ALBUM_DATA:

      return {...state,
        data:{...state.data, [action.payload.name]:  [...action.payload.album]}, 
        err:undefined
      };
    case actions.ERROR_ALBUM_LOADING:
      return merge(state, {err: action.payload})
      default:
      return state
  }
      
 };

 const artReducer = (state = [], action) => {
  if (action.type === actions.UPDATE_ART) return [...state, action.payload]
  return state
 }
 
 const userReducer = (state = {}, action) => {
   switch (action.type) {
     case actions.UPDATE_USER:
      return merge(state, action.payload)
     case actions.UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
     case actions.LOG_IN_FULFILLED:
      return merge(state, {token: action.payload})
     case actions.LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload})
      
     default:
      return state
   }
 }
 const isLoggedInReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_LOGGED_IN:
     return action.payload
    default:
     return state
  }
}
const reducer = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
  album: albumReducer,
  art:artReducer,
  isLoggedIn: isLoggedInReducer,
})

 export default reducer
  