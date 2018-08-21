import CSSModules from 'react-css-modules'
import styles from '../styles/setting.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'

const Setting = () => (
    <Flex styleName="container">
        <Flex.Item styleName="item" onClick={() => router.push('payType')}>
            <div styleName="icon-wallet"></div>
            <div styleName="title">充值</div>
        </Flex.Item>
        <Flex.Item styleName="item" onClick={() => router.push('withdraw')}>
            <div styleName="icon-get"></div>
            <div styleName="title">提现</div>
        </Flex.Item>
        <Flex.Item styleName="item" onClick={() => {router.push('OTCCashConversion')}}>
            <div styleName="icon-change"></div>
            <div styleName="title">资金划转</div>
        </Flex.Item>
    </Flex>
)

export default CSSModules(Setting,styles)
