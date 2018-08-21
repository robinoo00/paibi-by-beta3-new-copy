import Header from '../../../components/header2/header'
import {connect} from 'dva'

const EditHeader = ({title}) => (
    <Header
        title={title}
    />
)

const mapStateToProps = state => ({
    title:state.OTCWalletEdit.headerTitle
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(EditHeader)
