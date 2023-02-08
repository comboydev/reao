import {
	LOADED_USER_INFO_SUCCESS
} from '../constants/App';

const initState = {
	user: null,
}

const appStore = (state = initState, action) => {
	switch (action.type) {
		case LOADED_USER_INFO_SUCCESS:
			return {
				...state,
				user: action.payload,
			}
		default:
			return state;
	}
}

export default appStore