import superagent from 'superagent';

export const createPhoto = photo => ({
  type: 'CLIENT_PHOTO_CREATE',
  payload: photo,
});

export const deletePhoto = photo => ({
  type: 'CLIENT_PHOTO_DELETE',
  payload: photo,
});

export const createActionRequest = (photo) => (dispatch) => {
  let token = localStorage.getItem('token');
  return superagent.post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${token}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then (response =>{
      return dispatch(createPhoto(response.body));
    });
};