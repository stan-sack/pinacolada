import * as actions from './actions'

export const setUserLocation = position => ({
	type: actions.SET_USER_LOCATION,
	payload: position,
})

export const updatePositionOfInterest = position => ({
	type: actions.UPDATE_POSITION_OF_INTEREST,
	payload: position,
})

export const updateCurrentViewport = viewport => ({
	type: actions.UPDATE_CURRENT_VIEWPORT,
	payload: viewport,
})

export const updateShowGeoSearchList = bool => ({
	type: actions.UPDATE_SHOULD_SHOW_GEO_SEARCH_LIST,
	payload: bool
})
