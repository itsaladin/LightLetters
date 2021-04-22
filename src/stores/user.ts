import {types} from 'mobx-state-tree';

export const User = types.model('User', {
  customer_id: types.number,
  email: types.string,
});
