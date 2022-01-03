import {combineReducers} from 'redux'
import * as actions from './actions'

  

 const merge = (prev, next) => Object.assign({}, prev, next )

 const galleryReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.START_GALLERY_LOADING:
      return {...state, loading: true, err:undefined};
    case actions.STOP_GALLERY_LOADING:
      return {...state, loading: false};
    case actions.ADD_GALLERY_DATA:
      return {...state, data:[...action.payload], err:undefined};
    case actions.ERROR_GALLERY_LOADING:
      return merge(state, {err: action.payload})
        
    default:
      return state
  }
      
 };

 const albumReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.START_ALBUM_LOADING:
      return {...state, loading: true, err:undefined};
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


 const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.START_IMAGE_LOADING:
      state.data = state.data || {}
      state.data[action.payload.albumName] = state.data[action.payload.albumName] || {}

      state.data[action.payload.albumName][action.payload.imageName] = {loading: true}
      return {...state}
    case actions.STOP_IMAGE_LOADING:
      state.data[action.payload.albumName][action.payload.imageName].loading = false;
      return {...state}
    case actions.ADD_IMAGE_DATA:
      state.data[action.payload.albumName][action.payload.imageName].image = {...action.payload.image}
      return {...state}
    case actions.ERROR_IMAGE_LOADING:
      state.data[action.payload.albumName][action.payload.imageName] = {err: action.payload.err}
      return {...state}
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
  image: imageReducer, 
  art:artReducer,
  isLoggedIn: isLoggedInReducer,
})

 export default reducer
  