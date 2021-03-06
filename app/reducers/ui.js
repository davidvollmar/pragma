import { SELECT_REQUEST, SELECT_ENVIRONMENT, UNSET_ENVIRONMENT } from '../actions/ui';
import { DELETE_ENVIRONMENT } from '../actions/environments';
import { UPDATE_PATH } from 'redux-simple-router';
import { Map } from 'immutable';

export default function selectedRequest(state = new Map(), action) {
  switch (action.type) {
    case SELECT_REQUEST:
      return state.set('selectedRequest', action.request);
    case SELECT_ENVIRONMENT:
      return state.set('activeEnvironment', action.id);
    case UNSET_ENVIRONMENT:
      return state.remove('activeEnvironment');
    case DELETE_ENVIRONMENT:
      if (action.environment.id === state.get('activeEnvironment'))
        return state.remove('activeEnvironment');

      return state;
    case UPDATE_PATH:
      return state.remove('selectedRequest');
    default:
      return state;
  }
}
