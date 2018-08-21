import CSSModules from 'react-css-modules'
import styles from './header.css'
import router from 'umi/router'
import {connect} from 'dva'

const Header = ({headerColor,callBack=() => {},bgColor='',back=true,leftText='',rightText='',rightCallBack = () => {},url = '/',
                    leftCallBack = () => {url === '/' ? router.goBack() : router.push({pathname:url})},title}) => (
    <div styleName="page-header">
      <div styleName="header-wrap"
           style={
               bgColor
                   ?
                   {backgroundColor:bgColor}
                   : {backgroundColor:headerColor}
           }>
        <h3 onClick={callBack}>{title}</h3>
        {back ? <a onClick={() => {leftCallBack && leftCallBack()}} styleName="nav-left">
          <i styleName="icon-back"></i>
        </a> : <div styleName="nav-left" onClick={() => {leftCallBack && leftCallBack()}}>{leftText}</div>}
        <div styleName="nav-right" onClick={rightCallBack}>
          {rightText}
        </div>
      </div>

    </div>
)

const mapStateToProps = state => ({
    headerColor:state.god.headerColor
})

export default connect(mapStateToProps)(CSSModules(Header,styles))
