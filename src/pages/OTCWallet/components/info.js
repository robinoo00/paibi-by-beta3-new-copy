import CSSModules from 'react-css-modules'
import styles from '../styles/info.less'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'

const Info = ({info,assignHide,hide}) => (
    <div styleName="container">
        <div styleName={hide ? "close" : "eye"} onClick={assignHide}></div>
        <div styleName="header">资产估值</div>
        <Flex styleName="con">
            {info.map(item => (
                <Flex.Item key={item.title} styleName="item">
                    <div styleName="title">{item.title}</div>
                    <div styleName="value">{hide ? "****" : item.value}</div>
                </Flex.Item>
            ))}
        </Flex>
    </div>
)

const mapStateToProps = state => ({
    info:state.OTCWallet.info,
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
