import instance from './../config/axiosConfig';

export default {
  dictionaries: {
    createDictionary: data =>
      instance
        .post(`orgs/${data.owner}/collections/`, data)
        .then(response => response.data)
        /* eslint-disable */
        .then(() => { 
          return instance.post(`orgs/${data.owner}/sources/`, data);
        }),

    createDictionaryUser: data =>
      instance
        .post('user/collections/', data)
        .then(response => response.data)
        .then(() => {
          return instance.post('user/sources/', data);
        }),

    fetchingDictionaries: (query='', limit=25, page=1) =>
      instance
      .get(`collections/?q=${query}&limit=${limit}&page=${page}&verbose=true`)
      .then(payload => payload.data)
  },
  organizations: {
    fetchOrganizations: () =>
      instance
        .get(`users/${localStorage.username}/orgs/`)
        .then(response => response.data),
  },
};
