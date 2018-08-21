import CSSModules from 'react-css-modules'
import styles from '../styles/action.less'
import {List, Flex} from 'antd-mobile'
import {connect} from 'dva'
import qrcode from '../images/qrcode.jpg'

const Action = ({}) => (
    <List renderHeader={<div styleName='header'>请支付<span styleName='money'>9,750.00CNY</span>给以下账户</div>}>
        <Flex
            styleName={'list-item'}
        >
            <Flex.Item styleName={'title'}>
                支付方式
            </Flex.Item>
            <Flex.Item styleName={'alipay'}>
                支付宝
            </Flex.Item>
        </Flex>
        <Flex
            styleName={'list-item'}
        >
            <Flex.Item styleName={'title'}>
                账号
            </Flex.Item>
            <Flex.Item styleName={'value'}>
                1234567890
            </Flex.Item>
        </Flex>
        <Flex>
            <Flex.Item>
                <img styleName="qrcode" src={qrcode} alt=""/>
            </Flex.Item>
        </Flex>
    </List>
)

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(CSSModules(Action, styles))
