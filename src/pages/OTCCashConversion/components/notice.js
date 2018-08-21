import CSSModules from 'react-css-modules'
import styles from '../styles/notice.less'

const Notice = () => (
    <div styleName="container">
        温馨提示：未达到提币区块确认数的资产，暂不能转入法币账户
    </div>
)

export default CSSModules(Notice,styles)
