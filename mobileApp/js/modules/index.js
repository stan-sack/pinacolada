import { combineReducers } from 'redux'
import mapState from './mapState/reducer'
import rainfallChartState from './rainfallChart/reducer'

export default function getRootReducer(navReducer) {
	return combineReducers({
		nav: navReducer,
		mapState,
		rainfallChartState
	})
}
