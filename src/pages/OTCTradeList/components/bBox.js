import CSSModules from 'react-css-modules'
import styles from '../styles/bBox.less'
import {Flex} from 'antd-mobile'

const Item = Flex.Item

const BBox = ({hide}) => (
    <div styleName="wrapper">
        <div styleName="mask" onClick={hide}></div>
        <Flex wrap={'wrap'} styleName="container">
                <div styleName={'item'}>
                    <div styleName="usdt-icon"></div>
                    <div styleName="text">USDT</div>
                </div>
              <div styleName={'item'}>
                <div styleName="usdt-icon"></div>
                <div styleName="text">USDT</div>
              </div>
              <div styleName={'item'}>
                <div styleName="usdt-icon"></div>
                <div styleName="text">USDT</div>
              </div>
              <div styleName={'item'}>
                <div styleName="usdt-icon"></div>
                <div styleName="text">USDT</div>
              </div>
              <div styleName={'item'}>
                <div styleName="usdt-icon"></div>
                <div styleName="text">USDT</div>
              </div>
        </Flex>
    </div>
)

export default CSSModules(BBox,styles)
