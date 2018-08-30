import {Flex} from 'antd-mobile'
import CSSModules from 'react-css-modules'
import styles from '../styles/switch.less'
import {connect} from 'dva'

const Switch = ({switch_type,assignSwitchType}) => (
    <div>
        <Flex styleName={'container'}>
            <div>{switch_type === 1 ? '法币账户' : '我的钱包'}</div>
            <div styleName="icon" onClick={assignSwitchType}>
            </div>
            <div>{switch_type === 2 ? '法币账户' : '我的钱包'}</div>
        </Flex>
    </div>
)

const mapStateToProps = state => ({
    switch_type:state.OTCCashConversion.switch_type
})

const mapDispatchToProps = dispatch => ({
    assignSwitchType:() => {
        dispatch({
            type:'OTCCashConversion/assignSwitchType'
        })
        dispatch({
            type: 'OTCCashConversion/assignNum',
            num: 0
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Switch,styles))
