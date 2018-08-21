import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'

const Item = ({}) => (
    <div styleName="container" onClick={() => {router.push({pathname:'OTCTradeDetail',query:{}})}}>
        <Flex styleName="info">
            <Flex.Item styleName="nickname">皇家马德里(sell)</Flex.Item>
            <Flex styleName="money">
                <div styleName="price">3.99</div>
                <div styleName="unit">CNY</div>
            </Flex>
        </Flex>
        <Flex styleName="detail">
            <div styleName="trades">
                <div styleName="trade-num">
                    交易时间
                </div>
                <Flex>
                    <div styleName="alipay"></div>
                    <div styleName="yhpay"></div>
                </Flex>
            </div>
            <div styleName="limit-num">
                <div styleName="limit">金额 10,000-33,621.90</div>
                <div styleName="num">数量 4810.00</div>
            </div>
        </Flex>
    </div>
)

export default CSSModules(Item,styles)
