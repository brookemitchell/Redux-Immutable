import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementNumberOfLikes, decrementNumberOfLikes,
} from 'helpers/api'

import { Map, fromJS } from 'immutable'

export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

function addLike (duckId) {
  return {
    type: ADD_LIKE,
    duckId,
  }
}

function removeLike (duckId) {
  return {
    type: REMOVE_LIKE,
    duckId,
  }
}

function fetchingLikes () {
  return {
    type: FETCHING_LIKES,
  }
}

function fetchLikesError (error) {
  console.warn(error)
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes',
  }
}

function fetchingLikesSuccess (likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes,
  }
}

export function setUsersLikes () {
  return function (dispatch, getState) {
    const uid = getState().users.get('authedId')
    dispatch(fetchingLikes())
    fetchUsersLikes(uid)
      .then((likes) => dispatch(fetchingLikesSuccess(likes)))
      .catch((error) => dispatch(fetchLikesError(error)))
  }
}

export function addAndHandleLike (duckId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(addLike(duckId))

    const uid = getState().users.get('authedId')
    Promise.all([
      saveToUsersLikes(uid, duckId),
      incrementNumberOfLikes(duckId),
    ])
      .catch((error) => {
        console.warn(error)
        dispatch(removeLike(duckId))
      })
  }
}

export function handleDeleteLike (duckId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(removeLike(duckId))

    const uid = getState().users.get('authedId')
    Promise.all([
      deleteFromUsersLikes(uid, duckId),
      decrementNumberOfLikes(duckId),
    ])
      .catch((error) => {
        console.warn(error)
        dispatch(addLike(duckId))
      })
  }
}

const initialState = Map({
  isFetching: false,
  error: '',
})

export default function usersLikes (state = initialState, action) {
  switch (action.type) {
    case FETCHING_LIKES :
      return state.set('isFetching', true)
    case FETCHING_LIKES_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case FETCHING_LIKES_SUCCESS :
      return state.merge(
        action.likes,
        {
          isFetching: false,
          error: ''
        })
    case ADD_LIKE :
      return state.set(action.duckId, true)
    case REMOVE_LIKE :
      return state.remove(action.duckId)
    default :
      return state
  }
}
