import CSSModuels from 'react-css-modules'
import styles from '../styles/money.less'
import bg1 from '../images/bg1.png'
import bg2 from '../images/bg2.png'
import router from 'umi/router'
import {Flex} from 'antd-mobile'

const Money = ({info}) => (
    <div styleName="money-wrap">
        <img src={bg1} alt="" styleName="bg1"/>
        <img src={bg2} alt="" styleName="bg2"/>
        <Flex styleName={'container'}>
            <Flex.Item styleName="item" onClick={() => {router.push('myWallet')}}>
                <p styleName="title">我的钱包</p>
                <p styleName="value">{info.可用资金}</p>
                <p styleName="freeze">授信: {info.优先资金}</p>
            </Flex.Item>
            <Flex.Item styleName="item" onClick={() => {router.push('OTCWallet')}}>
                <p styleName="title">法币账户</p>
                <p styleName="value">{info.可用币}</p>
                <p styleName="freeze">冻结: {info.冻结币}</p>
            </Flex.Item>
        </Flex>
    </div>
)

export default CSSModuels(Money,styles)
