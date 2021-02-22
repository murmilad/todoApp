import {combineReducers} from 'redux'
import {UPDATE_USER, UPDATE_CONTACT} from './actions'

  

 const merge = (prev, next) => Object.assign({}, prev, next )

 const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
 }
 
 const userReducer = (state = {}, action) => {
   switch (action.type) {
     case UPDATE_USER:
      return merge(state, action.payload)
     case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
     default:
      return state
   }
 }

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

 // action creators
 const updateUser =  update => ({
   type: UPDATE_USER,
   payload: update,
 })

 const addContact = newContact =>({
   type: UPDATE_CONTACT,
   payload: newContact,
 })

 export default reducer
  