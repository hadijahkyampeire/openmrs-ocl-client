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
    
    // editDictionaryOrg: data =>
    //     instance
    //       .post(`org/${data.owner}collections/${short_code}`, data)
    //       .then(response => response.data)
    //       /* eslint-disable */
    //       .then(() => { 
    //         return instance.post(`user/${data.owner}sources/${short_code}`, data);
    //       }),
    // editDictionaryUser: data =>
    //   instance
    //     .post(`user/collections/${short_code}`, data)
    //     .then(response => response.data)
    //     /* eslint-disable */
    //     .then(() => { 
    //       return instance.post(`user/sources/${short_code}`, data);
    //     }),

    createDictionaryUser: data =>
      instance
        .post('user/collections/', data)
        .then(response => response.data)
        .then(() => {
          return instance.post('user/sources/', data);
        }),

    fetchingDictionaries: () =>
      instance
      .get(`collections/?q=${''}&limit=${0}&page=${1}&verbose=true`)
      .then(payload => payload.data),
      
    searchDictionaries: (searchTerm) =>
      instance
      .get(`collections/?q=${searchTerm}&limit=${0}&page=${1}&verbose=true`)
      .then(payload => payload.data),

    fetchDictionary: (data) =>
      instance
        .get(`${data}`)
        .then(response => response.data),
  },
  organizations: {
    fetchOrganizations: () =>
      instance
        .get(`users/${localStorage.username}/orgs/`)
        .then(response => response.data),
  },
};
