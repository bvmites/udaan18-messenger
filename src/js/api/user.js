import { headers, parseJSON } from './utils';
import { apiBaseUrl } from '../config';

export function postUser(username, password) {
  const options = {
    headers: headers(),
    method: 'POST',
    body: JSON.stringify({ username, password })
  };
  return fetch(`${apiBaseUrl}/user/login`, options)
    .then(parseJSON);
}
