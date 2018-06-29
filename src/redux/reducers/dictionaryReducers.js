import { FETCHING_DICTIONARIES, IS_FETCHING } from '../actions/types';

const initalState = { dictionaries: [], loading: false, hasMore: true };
// const filterPayload = (arr) => {
//   const filteredDictionary = [];
//   arr.map((repoType) => {
//     if (repoType.repository_type === 'OpenMRSDictionary') {
//       return filteredDictionary.push(repoType);
//     }
//     return filteredDictionary;
//   });
//   return filteredDictionary;
// };
export default (state = initalState, action) => {
  const calculateDictionaryPayload = () => {
    if (action.payload.length === 25) {
      console.log('length', action.payload.length);
      return {
        ...state,
        dictionaries: [...state.dictionaries, ...action.payload],
        hasMore: true,
      };
    }
    return {
      ...state,
      dictionaries: [...state.dictionaries, ...action.payload],
      hasMore: false,
    };
  };
  switch (action.type) {
    case FETCHING_DICTIONARIES:
      return calculateDictionaryPayload();
    case IS_FETCHING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
