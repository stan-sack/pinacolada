import * as actions from './actions'
import { getAspectRatio } from '../../helpers/meta'


const initialState = {
	data: [
		{quarter: 1, earnings: 13000},
		{quarter: 2, earnings: 16500},
		{quarter: 3, earnings: 14250},
		{quarter: 4, earnings: 19000}
	],

}

export default (state = initialState, action) => {
	switch (action.type) {
		default:
		return state
	}
}
