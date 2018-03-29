import { headers, parseJSON } from './utils';
import { apiBaseUrl } from '../config.js';

export function promoteToNextRound(participantIds, eventId, date, time, venue) {
  const options = {
    headers: headers(),
    method: 'POST',
    body: JSON.stringify({ ids: participantIds, date, time, venue })
  };
  return fetch(`${apiBaseUrl}/events/${eventId}/participations`, options)
    .then(parseJSON);
}

export function getParticipants(eventId) {
  const options = {
    headers: headers(),
    method: 'GET'
  };
  return fetch(`${apiBaseUrl}/events/${eventId}/participations`, options)
    .then(parseJSON);
}
