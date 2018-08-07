import { notify } from 'react-notify-toast';
import instance from '../../../config/axiosConfig';
import { editDictionary } from './dictionaryActions';

const short_code = localStorage.getItem('short_code');
const editDictionaryUser = () => async (dispatch) => {
  const url = `user/collections/${short_code}`;
  try {
    const response = await instance.post(url);
    dispatch(editDictionary(response.data));
    notify.show(
      'Successfully added your dictionary',
      'success', 6000,
    );
  } catch (error) {
    notify.show('Could not be edited', 'error', 6000);
  }
};
export default editDictionaryUser;
