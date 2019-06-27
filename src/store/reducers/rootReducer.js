// ----------- IMPORTS --------------------//
import authReducer from './authReducer'
import carroselReducer from './carroselReducer'
import searchReducer from './searchReducer'
import likeReducer from './likeReducer'
import laterReducer from './laterReducer'
import recomendadosReducer from './recomendadosReducer';
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
// --------------------------------------//


const rootReducer = combineReducers({
  auth: authReducer,
  carrosel: carroselReducer,
  search: searchReducer,
  like: likeReducer,
  later: laterReducer,
  recs: recomendadosReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer;
