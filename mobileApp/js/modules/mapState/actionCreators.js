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

export const updateNoRowsToDisplay = num => ({
	type: actions.UPDATE_NO_ROWS_TO_DISPLAY,
	payload: num
})

export const setShouldShowListView = bool => ({
	type: actions.SET_SHOULD_SHOW_LIST_VIEW,
	payload: bool
})

export const setShouldShowSearchInput = bool => ({
	type: actions.SET_SHOULD_SHOW_SEARCH_INPUT,
	payload: bool
})
