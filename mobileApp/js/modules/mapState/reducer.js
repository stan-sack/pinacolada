import * as actions from './actions'

const initialState = {
	newestImageUri: '',
	currentPosition: {}
}

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.SET_NEWEST_IMAGE:
		return {
			...state,
			newestImageUri: action.payload
		}
	case actions.SET_CURRENT_POSITION:
		return {
			...state,
			currentPosition: action.payload
		}
	default:
		return state
	}
}
