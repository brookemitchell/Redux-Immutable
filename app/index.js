import ReadtDOM from 'react-dom'
import React from 'react'
import router from './config/routes.js'
import { createStore } from 'redux'
import users from 'redux/modules/users'
import { Provider } from 'react-redux'

const store = createStore( users )

ReadtDOM.render(
  <Provider store={store}>
  {router}
  </Provider>,
  document.getElementById('app'))
