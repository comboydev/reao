import { combineReducers } from 'redux';
import Auth from './Auth';
import AppStore from './App';
import Theme from './Theme';
import Marketplace from './Marketplace';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    appStore: AppStore,
    marketplace: Marketplace,
});

export default reducers;