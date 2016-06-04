import ReadtDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import getRoutes from './config/routes.js'
import users from 'redux/modules/users'
import { checkIfAuthed } from 'helpers/auth.js'

const store = createStore(users, applyMiddleware(thunk))

function checkAuth (nextState, replace) {
  const isAuthed = checkIfAuthed(store)
  console.log('isAuthed', isAuthed)

  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }

  }
    else {
      /* replace('/auth')*/
      if(isAuthed !== true) {
        replace('/auth')
      }
    }

}

ReadtDOM.render(
  <Provider store={store}>
  {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app'))
