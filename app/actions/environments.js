import { Record, Map } from 'immutable';

export const UPSERT_ENVIRONMENT = 'UPSERT_ENVIRONMENT';
export const DELETE_ENVIRONMENT = 'DELETE_ENVIRONMENT';

export const Environment = Record({
  id: undefined,
  name: undefined,
  variables: new Map()
});

export function upsertEnvironment(environment) {
  if (!environment.id)
    environment = {...environment, id: randomId()};

  return {
    type: UPSERT_ENVIRONMENT,
    environment: environment
  };
}

export function deleteEnvironment(environment) {
  return {
    type: DELETE_ENVIRONMENT,
    environment: environment
  };
}

function randomId() {
  return Math.random().toString(32).slice(2).substr(0, 5);
}
