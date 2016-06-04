import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { Logout } from 'components'
import { logoutAndUnAuth } from 'redux/modules/users'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },

  componentDidMount () {
    this.props.dispatch(logoutAndUnAuth())
  },

  render () {
    return (
      <Logout />
    )},

})

export default connect()(LogoutContainer)
