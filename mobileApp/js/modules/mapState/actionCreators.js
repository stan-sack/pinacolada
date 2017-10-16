import * as actions from './actions'
import { getNewestImageUri } from '../../helpers/s3helper'

export const setNewestImageUri = () => {
	return dispatch => {
		getNewestImageUri().then((imageUri) => {
			console.log(imageUri)
			dispatch({
				type    : actions.SET_NEWEST_IMAGE,
				payload : imageUri
			})
		})
	}
}
