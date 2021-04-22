import {Instance, types} from 'mobx-state-tree';
import {LoginResStoreData} from '../types/auth/login-customer';
import {User} from './user';

export const RootStore = types
  .model('RootStore', {
    user: types.maybe(User),
    // state: types.maybe(types.string),
    verifed: false,
  })
  .actions((self) => ({
    logIn(user: LoginResStoreData) {
      self.user = user;
    },
    logout() {
      self.user = undefined;
    },
    setVerifed(verifed: boolean) {
      self.verifed = verifed;
    },
    // setState(s: string) {
    //   self.state = s;
    // },
  }))
  .views((self) => ({
    get isLoggedIn() {
      return !!self.user;
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;
