import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'
const ItemFinish = () => (
    <div styleName="container" onClick={() => {router.push({pathname:'OTCOrderDetail',query:{}})}}>
        <Flex styleName="header">
            <div styleName="name" data-type="卖" data-time='2018'>USDT</div>
            <div styleName="status">交易完成</div>
        </Flex>
        <Flex styleName="data">
            <Flex.Item styleName="item">
                <div styleName="num">6.75</div>
                <div styleName="unit">CNY</div>
            </Flex.Item>
            <Flex.Item styleName="item">
                <div styleName="num">6.75</div>
                <div styleName="unit">CNY</div>
            </Flex.Item>
            <Flex.Item styleName="item">
                <div styleName="num">6.75</div>
                <div styleName="unit">CNY</div>
            </Flex.Item>
        </Flex>
    </div>
)

export default CSSModules(ItemFinish,styles)
