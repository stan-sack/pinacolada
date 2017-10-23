import * as actions from './actions'
import { getNewestImageUri } from '../../helpers/s3helper'

export const setNewestImageUri = () => {
	return dispatch => {
		getNewestImageUri().then((imageUri) => {
			dispatch({
				type    : actions.SET_NEWEST_IMAGE,
				payload : imageUri
			})
		})
	}
}

export const setCurrentPosition = (position) => {
	console.log(position)
	return {
		type: actions.SET_CURRENT_POSITION,
		payload: position
	}
}
