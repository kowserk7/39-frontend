import superagent from 'superagent';

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenDelete = () => {
  delete localStorage.token;
  return {
    type: 'TOKEN_DELETE',
  };
};
export const signupRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/signup`)
    .send(user)
    .then(response => {
      dispatch(tokenSet(response.text));
      try {
        localStorage.setItem('token', response.text);
      } catch(event) {
        console.log(event);
      }
    });
};

export const signinRequest = user => dispatch => {
  return superagent.get(`${__API_URL__}/login`)
    .auth(user.username, user.password)
    .then(response => {
      dispatch(tokenSet(response.text));
      try {
        localStorage.setItem('token', response.text);
      } catch(event) {
        console.log(event);
      }
    });
}; 