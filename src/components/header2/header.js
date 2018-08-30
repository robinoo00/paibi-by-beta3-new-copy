import CSSModules from 'react-css-modules'
import styles from './header2.less'
import {connect} from 'dva'
import router from 'umi/router'

function _renderBack(rest){
    let back = typeof rest.back != 'undefined' ? rest.back : true
    if(back){
        return <div styleName="icon-back" onClick={rest.leftCallBack ? rest.leftCallBack : () => {
            router.goBack()
        }}></div>
    }else{
        return <div styleName="nav-left" onClick={rest.leftCallBack ? rest.leftCallBack : () => {
        }}>{rest.leftText}</div>
    }
}

const Header = ({...rest}) => (
    <div styleName="page-header">
        <div styleName="header-wrap"
             style={{backgroundColor: rest.bgColor ? rest.bgColor : rest.headerColor}}>
            <h3 onClick={rest.callBack}>{rest.title}</h3>
            {_renderBack(rest)}
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
