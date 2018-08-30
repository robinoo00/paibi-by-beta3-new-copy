import CSSModules from 'react-css-modules'
import styles from '../styles/setting.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'
import {connect} from 'dva'

const Setting = ({...rest}) => (
    <Flex styleName="container">
        <Flex.Item styleName="item" onClick={() => router.push('fund')}>
            <div styleName="icon-wallet"></div>
            <div styleName="title">历史转账</div>
        </Flex.Item>
        <Flex.Item styleName="item" onClick={rest.linkToPing}>
            <div styleName="icon-get"></div>
            <div styleName="title">平仓记录</div>
        </Flex.Item>
        <Flex.Item styleName="item" onClick={() => {router.push('OTCCashConversion')}}>
            <div styleName="icon-change"></div>
            <div styleName="title">资金划转</div>
        </Flex.Item>
    </Flex>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    linkToPing:() => {
        dispatch({
            type:'tradeList/assignTabs',
            choose_index:4
        })
        router.push('tradeList')
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Setting,styles))
