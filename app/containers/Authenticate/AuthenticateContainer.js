import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import { connect } from 'react-redux'

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching : PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  },

  handleAuth () {
    return auth().then((user) => {
      /* console.log(user)*/
    })
  },

  render () {
    console.log(this.props)
    return (
      <Authenticate
          isFetching={this.props.isFetching}
          error={this.props.error}
          onAuth={this.handleAuth}
      />

    ) },

})

function mapStateToProps (state) {

  return {
    isFetching: state.isFetching,
    error: state.error
  }
}

export default connect(mapStateToProps)(AuthenticateContainer)
