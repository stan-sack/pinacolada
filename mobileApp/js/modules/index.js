import { combineReducers } from 'redux'
import mapState from './mapState/reducer'

export default function getRootReducer(navReducer) {
	return combineReducers({
		nav: navReducer,
		mapState,
	})
}
