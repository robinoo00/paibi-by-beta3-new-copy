import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'
import themes from '../../../utils/themes'
import CountDown from '../../../components/countDown/'

function _renderTime(item){
    const order_stampTime = Date.parse(new Date(item.接单时间))
    const now_stampTime = Date.parse(new Date())
    if(item.接单状态 === '已接单未付款' && ((order_stampTime + 900000) > now_stampTime)){
        return (
            <CountDown value={item.接单时间}/>
        )
    }else{
        return null
    }
}

const ItemFinish = ({item}) => (
    <div styleName="container" onClick={() => {
        router.push({pathname: 'OTCReceiveOrderDetail', query: {no: item.接单单号}})
    }}>
        <Flex styleName="header">
            <div styleName="type-wrap">
                <span styleName="order-type"
                      style={item.类型 == '购买' ? {backgroundColor: themes.BuyColor} : {backgroundColor: themes.SellColor}}>
                    {item.类型}
                </span>
            </div>
            <div styleName="name">
                {item.接单时间}
            </div>
            <div styleName="status">{item.接单状态}</div>
        </Flex>
        <Flex styleName="data">
            <Flex.Item styleName="item">
                <div styleName="num">{item.单价}</div>
                <div styleName="unit">CNY</div>
            </Flex.Item>
            <Flex.Item styleName="item">
                <div styleName="num">{item.数量}</div>
                <div styleName="unit">数量</div>
            </Flex.Item>
            <Flex.Item styleName="item">
                <div styleName="num">{item.金额}</div>
                <div styleName="unit">金额</div>
            </Flex.Item>
        </Flex>
        <Flex styleName='footer'>
            <div styleName="seller">
                下单会员：{item.下单会员昵称}
            </div>
            <Flex styleName="time-input">
                {_renderTime(item)}
                <div styleName="submit">
                    详情
                    {/*{item.类型 === '出售' ? '详情' : '去支付'}*/}
                </div>
            </Flex>
        </Flex>
    </div>
)

export default CSSModules(ItemFinish, styles)
