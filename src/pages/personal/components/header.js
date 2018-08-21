import CSSModuels from 'react-css-modules'
import styles from '../styles/header.less'
import person from '../images/person.png'
import router from 'umi/router'

const Header = ({info}) => (
    <div styleName="header">
        <div styleName="img" onClick={() => {router.push('myInfo')}}>
            <img src={person} alt=""/>
        </div>
        <div styleName="info">
            <div>
                <div styleName="p">
                    <div styleName="text">{info.持卡人}</div>
                </div>
                <div styleName="switch-wrap">
                    <div styleName="account-type">
                        {info.帐号}
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default CSSModuels(Header, styles)
