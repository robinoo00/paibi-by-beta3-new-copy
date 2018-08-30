import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'

const link = (item) => () =>{
    // sessionStorage.setItem('tradeItem',JSON.stringify(item))
    router.push({pathname:'OTCTradeDetail',query:{no:item.单号,price:item.单价}})
}

const Item = ({item}) => (
    <div styleName="container" onClick={link(item)}>
        <Flex styleName="info">
            <Flex.Item styleName="nickname">{item.昵称}</Flex.Item>
            <Flex styleName="money">
                <div styleName="price">{item.单价.toFixed(2)}</div>
                <div styleName="unit">CNY</div>
            </Flex>
        </Flex>
        <Flex styleName="detail">
            <div styleName="trades">
                <div styleName="trade-num">
                    {item.下单时间}
                </div>
                <Flex>
                    <div styleName="alipay"></div>
                    {/*<div styleName="yhpay"></div>*/}
                </Flex>
            </div>
            <div styleName="limit-num">
                <div styleName="limit">金额 {(item.数量 * item.单价).toFixed(2)}</div>
                <div styleName="num">数量 {item.数量}</div>
            </div>
        </Flex>
    </div>
)

export default CSSModules(Item,styles)
