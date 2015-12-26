import RequestExecutor from '../gettable/RequestExecutor';
import { receiveResponse } from './response';
import { readProject } from '../utils/projectUtils';

export const UPSERT_PROJECT = 'UPSERT_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const ADD_REQUEST = 'ADD_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const EXECUTE_REQUEST = 'EXECUTE_REQUEST';

function randomId() {
  return Math.random().toString(32).slice(2).substr(0, 5);
}

export function upsertProject(projectPath) {
  return dispatch => {
    readProject(projectPath).then((project) => {
      const requests = project.requests.map(r => {
        r.projectId = project.id;
        return r;
      });

      dispatch({
        type: UPSERT_PROJECT,
        project: {
          path: projectPath,
          id: project.id,
          name: project.name,
          requests: requests
        }
      });
    });
  };
}

export function newProject(path, name) {
  return {
    type: UPSERT_PROJECT,
    project: {
      id: randomId(),
      path: `${path}/${name}.json`,
      name: name,
      requests: []
    }
  }
}

export function addRequest(request, projectId) {
  const newRequest = Object.assign({}, request, {
    id: randomId(),
    projectId: projectId
  });

  return {
    type: ADD_REQUEST,
    projectId: projectId,
    request: newRequest
  }
}

export function updateRequest(request) {
  return {
    type: UPDATE_REQUEST,
    request: request
  }
}

export function deleteRequest(request) {
  return {
    type: DELETE_REQUEST,
    request: request
  }
}

export function executeRequest(request) {
  return dispatch => {
    new RequestExecutor().execute(request).then((result) => {
      dispatch(receiveResponse(result.text, request));
    });
  };
}