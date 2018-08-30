import CSSModules from 'react-css-modules'
import styles from '../styles/alert.less'
import {List, Flex} from 'antd-mobile'

const Alert = ({}) => (
    <div styleName="container">
        <Flex
            styleName={'list-item'}
        >
            <Flex.Item styleName={'title'}>
                总金额
            </Flex.Item>
            <Flex.Item styleName={'value'}>
                123
            </Flex.Item>
        </Flex>
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
        <div styleName="tip">
            <p>亲爱的用户</p>
            <p>1、备注信息</p>
        </div>
    </div>
)

export default CSSModules(Alert, styles)
