import Header from '../../../components/header2/header'
import {connect} from 'dva'

const SettingHeader = ({title}) => (
    <Header
        title={title}
    />
)

const mapStateToProps = state => ({
    title:state.OTCWalletSetting.headerTitle
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(SettingHeader)
