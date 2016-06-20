import React, { PropTypes } from 'react'

export default function Duck ({duckId, ...props}) {
  console.log(props)
  return (
      <div> {duckId} - DUCK </div>
  )
}
