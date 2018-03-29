import { headers, parseJSON } from './utils';
import { apiBaseUrl } from '../config';

export function getEventDetails(eventId) {
  const options = {
    headers: headers(),
    method: 'GET'
  };
  return fetch(`${apiBaseUrl}/events/${eventId}`, options)
    .then(parseJSON);
}

export function moveToNextRound(eventId) {
  const options = {
    headers: headers(),
    method: 'POST'
  };
  return fetch(`${apiBaseUrl}/events/${eventId}/next`, options)
    .then(parseJSON);
}
