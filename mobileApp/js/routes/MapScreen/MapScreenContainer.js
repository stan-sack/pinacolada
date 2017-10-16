import { connect } from 'react-redux'
import { setNewestImageUri } from '../../modules/mapState/actionCreators'

import MapScreen from './MapScreen'

const mapDispatchToProps = {
    setNewestImageUri
}

const mapStateToProps = (state) => ({
    newestImageUri : state.mapState.newestImageUri
})


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
