import CSSModules from 'react-css-modules'
import styles from './header2.less'
import {connect} from 'dva'
import router from 'umi/router'

function _renderBack(back = true,title,callbak){
    if(back){
        return <div styleName="icon-back" onClick={callbak ? callbak : () => {
            router.goBack()
        }}>{title}</div>
    }else{
        return <div styleName="nav-left" onClick={callbak ? callbak : () => {
            router.goBack()
        }}>{title}</div>
    }
}

const Header = ({...rest}) => (
    <div styleName="page-header">
        <div styleName="header-wrap"
             style={{backgroundColor: rest.bgColor ? rest.bgColor : rest.headerColor}}>
            <h3 onClick={rest.callBack}>{rest.title}</h3>
            {_renderBack(rest.back,rest.leftText,rest.leftCallBack)}
            <div styleName="nav-right" onClick={rest.rightCallBack}>
                {rest.rightText}
            </div>
        </div>

    </div>
)

const mapStateToProps = state => ({
    headerColor: state.god.headerColor
})

export default connect(mapStateToProps)(CSSModules(Header, styles))
