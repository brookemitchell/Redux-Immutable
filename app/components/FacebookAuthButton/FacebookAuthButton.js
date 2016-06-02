import React, { PropTypes } from 'react'
import { button } from './styles.css'

export default function FacebookAuthButton ( {isFetching, onAuth }) {
  return (
    <button
        onClick={onAuth}
        className={button}>
    {isFetching
   ? 'Loading'
    : 'Login with facebook'}
    </button>
  )
}

FacebookAuthButton.proptypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
