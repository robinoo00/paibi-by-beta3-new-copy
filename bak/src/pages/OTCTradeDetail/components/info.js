import CSSModules from 'react-css-modules'
import styles from '../styles/info.less'
import {Flex} from 'antd-mobile'

const Info = () => (
    <div styleName="container">
        <Flex styleName="name-pay">
            <div styleName="name">梅赛德斯</div>
            <Flex styleName="pay-type">
                <div styleName="alipay"></div>
                <div styleName="yhpay"></div>
            </Flex>
        </Flex>
        <Flex styleName="trade-detail">
            <Flex>
                <div styleName="num">98%</div>
                <div styleName="title">成交率</div>
            </Flex>
            <Flex>
                <div styleName="num">1,369</div>
                <div styleName="title">交易单</div>
            </Flex>
            <Flex>
                <div styleName="num">1,369</div>
                <div styleName="title">放币时效</div>
            </Flex>
        </Flex>
    </div>
)

export default CSSModules(Info,styles)
