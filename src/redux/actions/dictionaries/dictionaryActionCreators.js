import { notify } from 'react-notify-toast';
import { addDictionary, fetchOrganizations, isSuccess, isFetching, isErrored } from './dictionaryActions';
import { filterPayload } from '../../reducers/util';
import api from './../../api';

export const createDictionary = data => dispatch =>
  api.dictionaries
    .createDictionary(data)
    .then(payload => dispatch(
      addDictionary(payload),
      notify.show('Successfully added dictionary to your organization', 'success', 6000),
    ))
    .catch(error => /* eslint-disable */
      notify.show(`${error.response.data.__all__[0]}`, 'error', 6000));

export const createDictionaryUser = data => dispatch =>
  api.dictionaries
    .createDictionaryUser(data)
    .then(payload => dispatch(
      addDictionary(payload),
      notify.show('Successfully added your dictionary', 'success', 6000),
    ))
    .catch(error =>
      notify.show(`${error.response.data.__all__[0]}`, 'error', 6000));

export const fetchingOrganizations = () => dispatch =>
  api.organizations
    .fetchOrganizations()
    .then(payload =>
      dispatch(fetchOrganizations(payload)));

export const fetchDictionaries = (query, limit, offset) => dispatch => {
  dispatch(isFetching(true));
  return api.dictionaries
    .fetchingDictionaries(query, limit, offset)
    .then(payload => {
      const results = filterPayload(payload)
        dispatch(isSuccess(results));
        dispatch(isFetching(false));
    })
    .catch(error => {
      dispatch(isErrored(error.response.data));
      dispatch(isFetching(false));
    });
}
