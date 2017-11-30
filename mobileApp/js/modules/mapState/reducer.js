import * as actions from './actions'
import { getAspectRatio } from '../../helpers/meta'


const initialState = {
	shouldShowGeoSearchList: false,
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
	case actions.UPDATE_SHOULD_SHOW_GEO_SEARCH_LIST:
		return {
			...state,
			showGeoSearchList: action.payload
		}
	default:
		return state
	}
}
