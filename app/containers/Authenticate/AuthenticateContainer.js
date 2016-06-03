import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching          : PropTypes.bool.isRequired,
    error               : PropTypes.string.isRequired,
    authUser            : PropTypes.func.isRequired,
    fetchingUser        : PropTypes.func.isRequired,
    fetchingUserFailure : PropTypes.func.isRequired,
    fetchingUserSuccess : PropTypes.func.isRequired,
  },

  handleAuth () {
    this.props.fetchingUser()

    return auth().then((user) => {
      this.props.fetchingUserSuccess(
        user.uid,
        user,
        Date.now()
         )

      this.props.authUser(user.uid)
    })
  },

  render () {
    return (
      <Authenticate
          isFetching={this.props.isFetching}
          error={this.props.error}
          onAuth={this.handleAuth} />
    ) },
})

function mapStateToProps (state) {
  console.log('STATE', state)
  return {
    isFetching: state.isFetching,
    error: state.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(AuthenticateContainer)
