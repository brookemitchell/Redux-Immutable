import React from 'react'
import ReadtDOM from 'react-dom'

export const Main = React.createClass({
  render() {
    return (
      <p> Hello </p>
    )
  }
});



ReadtDOM.render(
  <Main />,
  document.getElementById('app'))
