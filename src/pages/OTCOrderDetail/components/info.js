import CSSModules from 'react-css-modules'
import styles from '../styles/info.less'
import {List, Flex} from 'antd-mobile'
import {connect} from 'dva'

const Info = ({infos}) => (
    <List styleName="container">
        <Flex styleName='header'>
            <Flex.Item styleName="order-type-wrap">
                <span styleName="order-type">买</span>
            </Flex.Item>
            <Flex.Item styleName="kind">USDT</Flex.Item>
            <Flex.Item styleName="pay-status">待支付</Flex.Item>
        </Flex>
        <div styleName="list">
            {infos.map(item => (
                <Flex
                    key={item.key}
                    styleName={'list-item'}
                >
                    <Flex.Item styleName={'title'}>
                        {item.title}
                    </Flex.Item>
                    <Flex.Item styleName={'value'}>
                        {item.value}
                    </Flex.Item>
                </Flex>
            ))}
        </div>
    </List>
)

const mapStateToProps = state => ({
    infos:state.OTCOrderDetail.infos
})

export default connect(mapStateToProps)(CSSModules(Info, styles))
