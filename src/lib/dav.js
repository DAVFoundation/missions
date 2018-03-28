import store from '../store';
import timeout from 'callback-timeout';
import { 
  updateDavId, 
  unlockWallet,
  unregisteredDavId,
  registerDavIdFulfilled
} from '../actions';
import { davJS, web3 } from '@davfoundation/dav-js';

let davSDK;

export const initWeb3 = () => {
  if(process.env.BLOCKCHAIN_TYPE === 'NONE') {
    store.dispatch(registerDavIdFulfilled());
    return Promise.resolve('Blockchain is disabled');
  }
  return new Promise (function (resolve, reject) {
    web3.eth.getAccounts(timeout((error, accounts) => {
      if(error) {
        console.log(error);
        store.dispatch(unlockWallet());
        resolve(error);
      } else if(accounts.length > 0) {
        let davId = accounts[0];
        store.dispatch(updateDavId({ davId }));
        return isRegistered(davId);
      } else {
        // unlock metamask
        store.dispatch(unlockWallet());
        console.log('The wallet locked, please unlock it to continue.');
        resolve('The wallet locked, please unlock it to continue.');
      }
      reject();
    }, 1500));
  });
};

export const isRegistered = (davId) => {
  davSDK = new davJS(davId, davId);
  davSDK.isRegistered().then((isRegistered) => {
    if(isRegistered) {
      store.dispatch(registerDavIdFulfilled());
    } else {
      store.dispatch(unregisteredDavId());
    }
  }).catch(err => {
    console.log(err);
  });
};

export const registeredDavId = () => {
  davSDK.registerSimple().then((isRegistered) => {
    if(isRegistered === true) {
      store.dispatch(registerDavIdFulfilled());
    }
  }).catch(err => {
    console.log(err);
  });
};
