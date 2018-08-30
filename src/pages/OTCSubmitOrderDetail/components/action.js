import CSSModules from 'react-css-modules'
import styles from '../styles/action.less'
import {List, Flex} from 'antd-mobile'
import {connect} from 'dva'
import qrcode from '../images/qrcode.jpg'
import config from "../../../utils/config";

const Action = ({data}) => (
    <List renderHeader={<div styleName='header'>请支付<span styleName='money'>{data.金额}CNY</span>给以下账户</div>}>
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
                {data.支付宝}
            </Flex.Item>
        </Flex>
        <Flex>
            <Flex.Item>
                <img styleName="qrcode" src={config.server +'getuserpic2?url='+data.二维码} alt=""/>
            </Flex.Item>
        </Flex>
    </List>
)

const mapStateToProps = state => ({
    data:state.OTCSubmitOrderDetail.data
})

export default connect(mapStateToProps)(CSSModules(Action, styles))
