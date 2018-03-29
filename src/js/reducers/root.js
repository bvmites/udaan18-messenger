import event from './event';
import participants from './participants';
import promotionData from './promotionData';
import roundData from './roundData';
import user from './user';

import { combineReducers } from 'redux';

export default combineReducers({
  event,
  participants,
  promotionData,
  roundData,
  user
});
