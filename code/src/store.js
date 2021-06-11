import { createStore } from "redux";
import userassetsreducer from './reducers/userassetsreducer';

let initialstate = {
    // userID: "",
    // assetPurchasePrice: [0, 0, 0, 0],  //1 - stock, 2 - crypto, 3 - bonds, 4 - others
    // assetCurrentPrice: [0, 0, 0, 0],
    //loadingData: [1, 1, 1, 1],
    overlay:0,
    editFormData:{},
    stocks: [],
    stockLoading: 1,
    stockPurchasePrice:0,
    crypto: [],
    cryptoLoading: 1,
    cryptoPurchasePrice:0,
    bonds: [],
    bondLoading: 1,
    bondPurchasePrice:0,
    others: [],
    othersLoading: 1,
    othersPurchasePrice:0
}

// sending initial state as parameter and returning a store with the reducer and the initial state
function configurestore(state = initialstate) {

    // add the third parameter to connect redux store to redux devtools extension

    return createStore(userassetsreducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default configurestore;