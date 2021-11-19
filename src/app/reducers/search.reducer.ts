import {
  SEARCH_ERROR,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from "../constants/search.constants"
import { SearchActionTypes, SearchState } from "../types/search.types"

const INITIAL_STATE: SearchState = {
  results: [],
  loading: false,
  error: null,
}

const searchReducer = (state = INITIAL_STATE, action: SearchActionTypes) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        results: [],
        loading: true,
        error: null,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      }
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        results: [],
        error: action.payload,
      }
    default:
      return state
  }
}

export default searchReducer
