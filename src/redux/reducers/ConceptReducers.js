import { IS_FETCHING, FETCH_CONCEPTS, SEARCH_CONCEPTS, CLEAR_CONCEPTS } from '../actions/types';

const initialState = { concepts: [], loading: false, hasMore: false };
export default (state = initialState, action) => {
  const calculatePayload = () => {
    if (action.payload.length === 25) {
      return {
        ...state,
        concepts: [...state.concepts, ...action.payload],
        hasMore: true,
      };
    }
    return {
      ...state,
      concepts: [...state.concepts, ...action.payload],
      hasMore: false,
    };
  };
  switch (action.type) {
    case FETCH_CONCEPTS:
      return calculatePayload();
    case IS_FETCHING:
      return {
        ...state,
        loading: action.payload,
      };
    case SEARCH_CONCEPTS:
      return {
        ...state,
        concepts: action.payload,
        hasMore: false,
      };
    case CLEAR_CONCEPTS:
      return {
        ...state,
        sources: [],
      };
    default:
      return state;
  }
};
