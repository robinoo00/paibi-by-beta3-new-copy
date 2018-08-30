import CSSModules from 'react-css-modules'
import styles from '../styles/info.less'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'

const Info = ({info,assignHide,hide}) => (
    <div styleName="container">
        <div styleName={hide ? "close" : "eye"} onClick={assignHide}></div>
        <div styleName="header"></div>
        <Flex styleName="con">
            <Flex.Item styleName="item">
                <div styleName="title">可用</div>
                <div styleName="value">{hide ? "****" : info.可用资金}</div>
            </Flex.Item>
            <Flex.Item styleName="item">
                <div styleName="title">自有</div>
                <div styleName="value">{hide ? "****" : info.劣后资金}</div>
            </Flex.Item>
            <Flex.Item styleName="item">
                <div styleName="title">授信</div>
                <div styleName="value">{hide ? "****" : info.优先资金}</div>
            </Flex.Item>
        </Flex>
    </div>
)

const mapStateToProps = state => ({
    info:state.personal.info,
    hide:state.OTCWallet.hide
})

const mapDispatchToProps = dispatch => ({
    assignHide:() => {
        dispatch({
            type:'OTCWallet/assignHide'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Info,styles))
