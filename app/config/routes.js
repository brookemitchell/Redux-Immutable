import React from 'react'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { MainContainer, HomeContainer } from 'containers'

const routes = (
  <Router history={hashHistory} >
    <Router path='/' component={MainContainer} >
      <Route path="logout" />
      <IndexRoute component={HomeContainer} />
    </Router>
  </Router>
)

export default routes
