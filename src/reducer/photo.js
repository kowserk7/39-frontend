const validatePic = photo => {
  if (!photo) 
    throw new Error ('Invalid Photo');
  let {_id, url, description, owner} = photo;
  if (!_id || !url || !owner || !description) 
    throw new Error ('Invalid Photo');
};
export default(state =[], {type, payload}) => {
  switch(type){
  case 'CLIENT_PHOTO_CREATE':
    validatePic(payload);
    return [payload, ...(state)];
  case 'CLIENT_PHOTO_DELETE': 
    return state.filter(photo => photo._id !== payload._id);
  case 'TOKEN_DELETE': return [];
  default: return state;
  }
};