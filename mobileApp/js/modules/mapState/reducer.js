import * as actions from './actions'
import { getAspectRatio } from '../../helpers/meta'


const initialState = {
	shouldShowListView: false,
	shouldShowSearchInput: false,
	noRowsToDisplay: 0,
	userLocation: undefined,
	positionOfInterest: undefined,
	currentViewport: {
		lat: -33.8688,
		lng: 151.2093,
		latDelta: 1,
		lngDelta: getAspectRatio(),
	},
}

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.SET_USER_LOCATION:
		return {
			...state,
			userLocation: action.payload,
		}
	case actions.UPDATE_POSITION_OF_INTEREST:
		return {
			...state,
			positionOfInterest: action.payload,
		}
	case actions.UPDATE_CURRENT_VIEWPORT:
		return {
			...state,
			currentViewport: action.payload,
		}
	case actions.UPDATE_NO_ROWS_TO_DISPLAY:
		return {
			...state,
			noRowsToDisplay: action.payload,
		}
	case actions.SET_SHOULD_SHOW_LIST_VIEW:
		return {
			...state,
			shouldShowListView: action.payload,
		}
	case actions.SET_SHOULD_SHOW_SEARCH_INPUT:
		return {
			...state,
			shouldShowSearchInput: action.payload,
		}
	default:
		return state
	}
}
