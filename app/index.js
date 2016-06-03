import ReadtDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import router from './config/routes.js'
import users from 'redux/modules/users'

const store = createStore( users , applyMiddleware(thunk))

ReadtDOM.render(
  <Provider store={store}>
  {router}
  </Provider>,
  document.getElementById('app'))
