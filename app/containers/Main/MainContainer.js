import React, {PropTypes} from 'react'
import { container, innerContainer } from './styles.css'
import { Navigation } from 'components'
import { connect } from 'react-redux'


const Main = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired
  },

  render () {
    console.log(this.props)
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default connect(
  (state) => ({isAuthed: state.isAuthed})
)(Main)
