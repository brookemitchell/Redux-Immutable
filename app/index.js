import ReadtDOM from 'react-dom'
import React from 'react'
import thunk from 'redux-thunk'
import getRoutes from './config/routes.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { checkIfAuthed } from 'helpers/auth.js'
import * as reducers from 'redux/modules'

const combinedReducers = combineReducers(reducers)

const store = createStore(
  combinedReducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

function checkAuth (nextState, replace) {
  const isAuthed = checkIfAuthed(store)

  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  }
    else {
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
