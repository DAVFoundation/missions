import store from '../store';
import timeout from 'callback-timeout';
import {
  updateDavId,
  updateContractMissionIdMissionId,
  unlockWallet,
  unregisteredDavId,
  registerDavIdFulfilled,
  createMissionTransactionFulfilled,
  createMissionTransactionFailed,
} from '../actions';
const TruffleContract = require('truffle-contract');
const Web3 = require('web3');
const apiRoot = process.env.MISSION_CONTROL_URL;
const captainSimRoot = process.env.CAPTAIN_SIM_URL;

let blockchainType = process.env.BLOCKCHAIN_TYPE || 'INJECTED';
let web3Provider = null;
// Use injected web3 instance
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3Provider = window.web3.currentProvider;
} else if (blockchainType === 'ETH_LOCAL_TESTNET') {
  // If no injected web3 instance is detected, fall back to Ganache
  web3Provider = new Web3
    .providers
    .HttpProvider('http://localhost:8545');
}

let web3 = new Web3(web3Provider);
let davSDK;
const DavContracts = function () {
  let contracts = {
    identity: {
      artifact: TruffleContract(require('../build/contracts/Identity.json')),
      instance: null
    },
    token: {
      artifact: TruffleContract(require('../build/contracts/DAVToken.json')),
      instance: null
    },
    mission: {
      artifact: TruffleContract(require('../build/contracts/BasicMission.json')),
      instance: null
    }
  };

  this.getInstance = function (contract) {
    return new Promise(function (resolve, reject) {
      if (contracts[contract].instance) {
        resolve(contracts[contract].instance);
      } else {
        contracts[contract].artifact.setProvider(web3.currentProvider);
        contracts[contract].artifact.deployed()
          .then(function (instance) {
            contracts[contract].instance = instance;
            resolve(contracts[contract].instance);
          }).catch(function (err) {
            reject(err);
          });
      }
    });
  };
};

let davJS = function (davId, wallet) {
  this.davId = davId;
  this.wallet = wallet;
  this.davContracts = new DavContracts();

  this.isRegistered = function () {
    let dav = this;
    return this.davContracts.getInstance('identity')
      .then(function (instance) {
        return instance.isRegistered.call(dav.davId, { from: dav.wallet });
      });
  };

  this.registerSimple = function () {
    let dav = this;
    if (blockchainType === 'NONE') {
      return Promise.resolve({});
    }

    return new Promise(function (resolve, reject) {
      return dav.davContracts.getInstance('identity')
        .then(function (identityContractInstance) {
          return identityContractInstance
            .registerSimple({ from: dav.wallet })
            .then(function (res) {
              console.log(res);
              resolve(true);
            })
            .catch(function (err) {
              reject(err);
            });

        }).catch(function (err) {
          reject(err);
        });
    });
  };

  this.createMissionTransaction = function (bidId, vehicleId, missionCost, tockenAmount) {
    let dav = this;
    if (blockchainType === 'NONE') {
      return Promise.resolve(true);
    }

    var tokenContractInstance;
    var missionContractInstance;
    return dav.davContracts.getInstance('token')
      .then(function (instance) {
        tokenContractInstance = instance;
        return dav.davContracts.getInstance('mission')
          .then((instance) => {
            missionContractInstance = instance;
            return tokenContractInstance.approve(missionContractInstance.address, tockenAmount, { from: dav.wallet });
          })
          .then(() => {
            return missionContractInstance.create(bidId, vehicleId, dav.davId, tockenAmount, { from: dav.wallet, value: missionCost });
          });
      });
  };

  this.approveCompletedMission = function (missionId) {
    let dav = this;
    if (blockchainType === 'NONE') {
      return Promise.resolve(true);
    }

    return dav.davContracts.getInstance('mission')
      .then((instance) => {
        return instance.fulfilled(missionId, { from: dav.wallet });
      });
  };
};

export const initWeb3_NO_BLOCKCHAIN = () => {
  blockchainType = 'NONE';
  return initWeb3();
};

export const initWeb3 = () => {
  if (blockchainType === 'NONE') {
    store.dispatch(registerDavIdFulfilled());
    return Promise.resolve('Blockchain is disabled');
  }
  return new Promise(function (resolve, reject) {
    web3.eth.getAccounts(timeout((error, accounts) => {
      if (error) {
        console.log(error);
        store.dispatch(unlockWallet());
        reject(error);
      } else if (accounts.length > 0) {
        let davId = accounts[0];
        store.dispatch(updateDavId({ davId }));
        resolve(isRegistered(davId));
      } else {
        // unlock metamask
        store.dispatch(unlockWallet());
        console.log('The wallet locked, please unlock it to continue.');
        reject('The wallet locked, please unlock it to continue.');
      }
      reject();
    }, 1500));
  });
};

export const isRegistered = (davId) => {
  if (blockchainType === 'NONE') {
    store.dispatch(registerDavIdFulfilled());
    return Promise.resolve('Blockchain is disabled');
  }
  davSDK = new davJS(davId, davId);
  return davSDK.isRegistered().then((isRegistered) => {
    if (isRegistered) {
      store.dispatch(registerDavIdFulfilled());
    } else {
      store.dispatch(unregisteredDavId());
    }
    return isRegistered;
  }).catch(err => {
    console.log(err);
  });
};

export const registerDavId = () => {
  if (blockchainType === 'NONE') {
    store.dispatch(registerDavIdFulfilled());
    return Promise.resolve('Blockchain is disabled');
  }
  davSDK.registerSimple().then((isRegistered) => {
    if (isRegistered === true) {
      store.dispatch(registerDavIdFulfilled());
    }
  }).catch(err => {
    console.log(err);
  });
};

export const createMissionTransaction = (bidId, captain_id, price, tocken_amount) => {
  if (blockchainType === 'NONE') {
    store.dispatch(updateContractMissionIdMissionId({ bidId }));
    return Promise.resolve('Blockchain is disabled');
  }
  davSDK.createMissionTransaction(bidId, captain_id, price, tocken_amount).then((response) => {
    if(response.logs.length > 0) {
      let contractMissionId = response.logs[0].args.id;
      store.dispatch(updateContractMissionIdMissionId({ contractMissionId }));
    }
    store.dispatch(createMissionTransactionFulfilled(response));
  }).catch(err => {
    console.log(err);
    store.dispatch(createMissionTransactionFailed(err));
  });
};

export const approveCompletedMission = () => {
  if (blockchainType === 'NONE') {
    store.dispatch(updateMissionStatus('confirmed'));
    return Promise.resolve('Blockchain is disabled');
  }
  let mission = store.getState().mission;
  let contractMissionId = mission.contractMissionId || mission.id;
  initWeb3().then(() => {
    return davSDK.approveCompletedMission(contractMissionId);
  }).then((response) => {
    console.log(response.logs[0]);
    store.dispatch(updateMissionStatus('confirmed'));
  }).catch(err => {
    console.log(err);
  });
};


export const chooseBid = (bidId, captain_id, price) => {
  let url = new URL(`/bids/${bidId}/choose`, apiRoot);
  return fetchWithUserId(url, 'PUT').then(response => {
    store.dispatch(createMissionTransaction(bidId, captain_id, price));
    return response;
  });
};

export const createNeed = (params) => {
  let url = new URL(`/needs`, apiRoot);
  params = {
    ...params,
    // need_type: params.need_type
  };
  return fetchWithUserId(url, 'POST', params);
};


export const fetchBids = ({
  needId
}) => {
  let url = new URL(`/bids/${needId}`, apiRoot);
  return fetchWithUserId(url);
};

export const cancelNeed = () => {
  const needId = store.getState().order.needId;
  let url = new URL(`/needs/${needId}`, apiRoot);
  return fetchWithUserId(url, 'DELETE');
};

export const updateMissionStatus = (status, captain_status) => {
  const missionId = store.getState().mission.mission_id;
  let url = new URL(`/missions/${missionId}`, apiRoot);
  let body = {status};
  if(captain_status) {
    body = {
      vehicle_status: captain_status,
      mission_status: status
    };
  }
  return fetchWithUserId(url, 'PUT', body);
};

export const confirmTakeoff = () => {
  const missionId = store.getState().mission.mission_id;
  const command = 'takeoff_pickup';
  let url = new URL(`/mission_command`, apiRoot);
  url.searchParams.set('mission_id', missionId);
  url.searchParams.set('command', command);
  return fetchWithUserId(url);
};

export function fetchSimulationDrones() {
  let url = new URL(`/simulation/drones`, captainSimRoot);

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const coords = store.getState().map.coords;

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      latitude: coords.lat,
      longitude: coords.long
    })
  };
  return fetch(url, options).then(response => response.json());
}


export const fetchStatus = ({
  id,
  lat,
  long,
  needId
}) => {
  const missionId = store.getState().mission.id;
  let url = new URL(`/status`, apiRoot);
  id && url.searchParams.set('id', id);
  lat && url.searchParams.set('lat', lat); // Don't stand on the equator or you'll break this
  long && url.searchParams.set('long', long);
  needId && url.searchParams.set('needId', needId);
  missionId && url.searchParams.set('missionId', missionId);
  return fetchWithUserId(url);
};

const fetchWithUserId = (url, method = 'GET', body) => {
  const userId = store.getState().settings.user_id;
  url.searchParams.set('user_id', userId);
  const headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const options = {
    method,
    headers
  };
  if (body) options.body = JSON.stringify(body);
  return fetch(url, options).then(response => response.json());
};
