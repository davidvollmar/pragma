import { AWAITING_RESPONSE, RECEIVE_RESPONSE, RECEIVE_ERROR, CANCEL_RESPONSE } from '../actions/response';
import { UPDATE_PATH } from 'redux-simple-router'
import { Map } from 'immutable';

const defaultState = null;

const cancelResponse = (state) => {
  state && state.cancel && state.cancel();
};

const isPending = (state) => {
  return state && state.pending;
};

export default function response(state = defaultState, action) {
  switch (action.type) {
    case AWAITING_RESPONSE:
      return {pending: true, cancel: action.cancel};
    case RECEIVE_RESPONSE:
      if (!isPending(state))
        return defaultState;

      return {object: action.response};
    case RECEIVE_ERROR:
      if (!isPending(state))
        return defaultState;

      return {error: action.error};
    case CANCEL_RESPONSE:
      cancelResponse(state);
      return defaultState;
    case UPDATE_PATH:
      cancelResponse(state);
      return defaultState;
    default:
      return state;
  }
}
