import CSSModules from 'react-css-modules'
import styles from '../styles/info.less'
import {List, Flex} from 'antd-mobile'
import {connect} from 'dva'

const Info = ({infos,data}) => (
    <List styleName="container">
        <Flex styleName='header'>
            <Flex.Item styleName="order-type-wrap">
                <span styleName="order-type">{data.类型}</span>
            </Flex.Item>
            <Flex.Item styleName="kind">USDT</Flex.Item>
            <Flex.Item styleName="pay-status">{data.接单状态}</Flex.Item>
        </Flex>
        <div styleName="list">
            {infos.map(item => (
                <div key={item.key}>
                    {item.value ? <Flex
                        styleName={'list-item'}
                    >
                        <Flex.Item styleName={'title'}>
                            {item.title}
                        </Flex.Item>
                        <Flex.Item styleName={item.key === 'test6' ? 'account' : 'value'}>
                            {item.value}
                        </Flex.Item>
                    </Flex> : null}
                </div>
            ))}
        </div>
    </List>
)

const mapStateToProps = state => ({
    infos:state.OTCSubmitOrderDetail.infos,
    data:state.OTCSubmitOrderDetail.data
})

export default connect(mapStateToProps)(CSSModules(Info, styles))
