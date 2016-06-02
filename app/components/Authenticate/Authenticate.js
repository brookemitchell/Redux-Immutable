import React, { PropTypes } from 'react'
import {centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components'

export default function Authenticate ( {error, isFetching, onAuth}) {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader} >Authenticaade</h1>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p className={errorMsg}>{error}</p> : null }

    </div>
  )
}

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

