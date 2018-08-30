import {connect} from 'dva'
import Header from '../../../components/header2/header'

const Head = ({data}) => (
    <Header
        title={
            data.类型 === '买' ? '购买USDT' : '出售USDT'
        }
    />
)

const mapStateToProps = state => ({
    data:state.OTCTradeDetail.data
})

export default connect(mapStateToProps)(Head)
