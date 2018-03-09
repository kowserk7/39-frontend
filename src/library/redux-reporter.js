let reporter = store => next => action => {
  console.log('__ACTION__', action);

  try {
    let result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  } catch(event) {
    event.action = action;
    console.error('__ERROR__', event);
    return event;
  }
};

export default reporter;