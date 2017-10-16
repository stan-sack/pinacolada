import * as actions from './actions'

const initialState = {
	newestImageUri: ''
}

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.SET_NEWEST_IMAGE:
		return {
			...state,
			newestImageUri: action.payload
		}
	default:
		return state
	}
}
