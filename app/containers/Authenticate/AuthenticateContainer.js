import React from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'

const AuthenticateContainer = React.createClass({

  handleAuth () {
    return auth().then( (user) => {
      console.log(user)
    })
  },

  render () {
    return (
      <Authenticate
          isFetching={false}
          onAuth={this.handleAuth}
          error=''
      />

    ) },

})

export default AuthenticateContainer
