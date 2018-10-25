import CSSModules from 'react-css-modules'
import styles from '../styles/notice.less'

const Notice = () => (
    <div styleName="container">
        温馨提示：1、如果外盘有持仓，暂无法转入法币账户。
        {/*&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2.如果有冻结，暂冻结部分无法转入我的钱包*/}
        2、如果有冻结，暂冻结部分无法转入我的钱包
    </div>
)

export default CSSModules(Notice,styles)
