import CSSModules from 'react-css-modules'
import styles from '../styles/setting.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'

const Setting = () => (
    <Flex styleName="container">
        <Flex.Item styleName="item" onClick={() => {router.push('OTCWalletSettings')}}>
            <div styleName="icon-wallet"></div>
            <div styleName="title">收付款设置</div>
        </Flex.Item>
        <Flex.Item styleName="item" onClick={() => {router.push('OTCTradeList')}}>
            <div styleName="icon-market"></div>
            <div styleName="title">交易市场</div>
        </Flex.Item>
        <Flex.Item styleName="item" onClick={() => {router.push('OTCCashConversion')}}>
            <div styleName="icon-change"></div>
            <div styleName="title">资金划转</div>
        </Flex.Item>
    </Flex>
)

export default CSSModules(Setting,styles)
