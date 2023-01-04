import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Marketplace from './Marketplace';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    marketplace: Marketplace,
});

export default reducers;