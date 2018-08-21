import CSSModules from 'react-css-modules'
import styles from '../styles/time.less'
import {List, Flex} from 'antd-mobile'
import {connect} from 'dva'

const Action = ({}) => (
    <div styleName="container">
        <div styleName="time">
            剩余14min47s
        </div>
    </div>
)

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(CSSModules(Action, styles))
