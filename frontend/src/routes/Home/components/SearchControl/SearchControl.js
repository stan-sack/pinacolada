import { MapControl, PropTypes as LeafletPropTypes } from 'react-leaflet'
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch'
import 'leaflet-geosearch/dist/style.css'
import 'leaflet-geosearch/assets/css/leaflet.css'

const provider = new EsriProvider()
const searchControl = new GeoSearchControl({
	provider: provider,
})

export default class SearchControl extends MapControl {
	static propTypes = {
		position:  LeafletPropTypes.controlPosition,
	}

	createLeafletElement (props: Object): Object {
		return searchControl
	}
}
