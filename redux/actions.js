import {login, fetchGallery, fetchAlbum} from '../api'

// action types

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'  
export const SET_LOGGED_IN = 'SET_LOGGED_IN'  
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'
export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const ERROR_LOADING = 'ERROR_LOADING'
export const ADD_GALLERY_DATA = 'ADD_GALLERY_DATA'
export const ADD_ALBUM_DATA = 'ADD_ALBUM_DATA'
export const UPDATE_ART = 'UPDATE_ART'

 // action creators
 export const updateUser =  update => ({
   type: UPDATE_USER,
   payload: update,
 })

 export  const addContact = newArt =>({
   type: UPDATE_ART,
   payload: newContact,
 })

 export  const setLoggedIn = loggedIn =>({
  type: SET_LOGGED_IN,
  payload: loggedIn,
})

export  const startLoading = () =>({
  type: START_LOADING
})

export  const stopLoading = () =>({
  type: STOP_LOADING
})


// async action creators
  export const logInUser = (username, password) => async dispatch => {
    dispatch({type: LOG_IN_SENT})
    try {
      const token = await login(username, password)
      dispatch({type: LOG_IN_FULFILLED, payload: token})
    } catch(err) {
       dispatch({type: LOG_IN_REJECTED, payload: err.message})
    }
  }

  export const loadGalleryData = () => async dispatch => {
    dispatch({type: START_LOADING})
    try {
      const gallery = await fetchGallery()
      dispatch({type: STOP_LOADING})
      dispatch({type: ADD_GALLERY_DATA, payload: gallery})
    } catch(err) {
       dispatch({type: ERROR_LOADING, payload: err.message})
    }
  }

  export const loadAlbumData = (artId) => async dispatch => {
    dispatch({type: START_LOADING})
    try {
      const album = await fetchAlbum()
      dispatch({type: STOP_LOADING})
      dispatch({type: ADD_ALBUM_DATA, payload: album})
    } catch(err) {
       dispatch({type: ERROR_LOADING, payload: err.message})
    }
  }
