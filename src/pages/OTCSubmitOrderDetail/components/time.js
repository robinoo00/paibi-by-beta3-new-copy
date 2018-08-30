import CSSModules from 'react-css-modules'
import styles from '../styles/time.less'
import {List, Flex} from 'antd-mobile'
import {connect} from 'dva'
import CountDown from '../../OTCMyReceiveOrders/components/countDown'

const Action = ({data}) => (
    <div styleName="container">
        <div styleName="time">
            剩余
            {data.接单时间 ? <CountDown value={data.接单时间}/> : null}
        </div>
    </div>
)

const mapStateToProps = state => ({
    data:state.OTCSubmitOrderDetail.data
})

export default connect(mapStateToProps)(CSSModules(Action, styles))
