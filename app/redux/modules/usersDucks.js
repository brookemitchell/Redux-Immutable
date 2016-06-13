const FETCHING_USERS_DUCKS_ERROR = 'FETCHING_USERS_DUCKS_ERROR'
const ADD_SINGLE_USERS_DUCK = 'ADD_SINGLE_USERS_DUCK'
const FETCHING_USERS_DUCKS_SUCCESS = 'FETCHING_USERS_DUCKS_SUCCESS'
const FETCHING_USERS_DUCKS = 'FETCHING_USERS_DUCKS'

function fetchingUsersDucks (uid) {
  return {
    type: FETCHING_USERS_DUCKS,
    uid,
  }
}

function fetchingUsersDucksError () {
  return {
    type: FETCHING_USERS_DUCKS_ERROR,
    error: 'Error fetching Users Duck Ids',
  }
}

function fetchingUsersDucksSuccess (uid, duckIds, lastUpdated) {
  return {
    type: FETCHING_USERS_DUCKS_SUCCESS,
    uid,
    duckIds,
    lastUpdated,
  }
}

export function addSingleUsersDuck (uid, duckId) {
  return {
    type: ADD_SINGLE_USERS_DUCK,
    uid,
    duckId,
  }
}
const initialUsersDuckState = {
  lastUpdated: 0,
  duckIds: [],
}


function usersDuck (state = initialUsersDuckState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCK:
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckId]),
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function usersLike (state=initialState, action) {
  switch(action.type) {

    case ADD_SINGLE_USERS_DUCK:
      return typeof state[action.uid] === 'undefined'
           ? state
           : {
             isFetching: false,
             error: '',
             [action.uid]: usersDuck(state[action.uid], action),
           }

    case FETCHING_USERS_DUCKS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      error: '',
      [action.uid]: {
        lastUpdated: action.lastUpdated,
        duckIds: action.duckIds,
      }
    }
    case FETCHING_USERS_DUCKS_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.error
    }
    case FETCHING_USERS_DUCKS:
    return {
      ...state,
      isFetching: true,
    }
    default:
      return state

  }
}
