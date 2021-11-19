import {
  SEARCH_ERROR,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from "../constants/search.constants";

export interface SearchResult {
  name: string;
  id: string;
}

export interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null | undefined;
}

interface SearchRequestAction {
  type: typeof SEARCH_REQUEST;
}

interface SearchSuccessAction {
  type: typeof SEARCH_SUCCESS;
  payload: SearchResult[];
}

interface SearchErrorAction {
  type: typeof SEARCH_ERROR;
  payload: string;
}

export type SearchActionTypes =
  | SearchRequestAction
  | SearchSuccessAction
  | SearchErrorAction;
