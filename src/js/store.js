import { createStore, applyMiddleware } from 'redux';
import root from './reducers/root';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  root,
  composeWithDevTools(applyMiddleware(thunk))
);
