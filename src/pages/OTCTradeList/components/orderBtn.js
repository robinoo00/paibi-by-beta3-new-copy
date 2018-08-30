import CSSModules from 'react-css-modules'
import styles from '../styles/orderBtn.less'
import {connect} from 'dva'
import router from 'umi/router'

const OrderBtn = () => (
    <div styleName="container" onClick={() => {router.push('OTCSubmitOrder')}}>

    </div>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(OrderBtn, styles))
