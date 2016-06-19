import React from 'react'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import {
  MainContainer,
  HomeContainer,
  Authenticate,
  FeedContainer,
  LogoutContainer,
} from 'containers'

export default function getRoutes (checkAuth) {
  const routes = (
    <Router history={browserHistory} >
      <Route path='/' component={MainContainer} >
        <Route path='auth' component={Authenticate} onEnter={checkAuth}/>
        <Route path='feed' component={FeedContainer} onEnter={checkAuth}/>
        <Route path='logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer}  onEnter={checkAuth} />
      </Route>
    </Router>
  )

  return routes
}
