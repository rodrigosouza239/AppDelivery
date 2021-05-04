import { combineReducers } from 'redux';

import login from './login';
import locations from './locations';
import company from './company';
import products from './products';
import cart from './cart';
import register from './register';
import profile from './profile';
import order from './order';
import notifications from './notifications';
import review from './review';

const rootReducer = combineReducers({
  login,
  locations,
  company,
  products,
  cart,
  register,
  profile,
  order,
  notifications,
  review,
});

export default rootReducer;
