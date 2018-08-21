import CSSModules from 'react-css-modules'
import styles from '../styles/slide.less'
import {connect} from 'dva'
const Slide = ({children, show,hide}) => (
    <div>
        <div styleName="mask1" onClick={hide}>

        </div>
        <div styleName="container">
            {children}
        </div>
        <div styleName="mask2" onClick={hide}>

        </div>
    </div>
)

const mapStateToProps = state => ({
    show:state.OTCTradeList.slideMoneyShow && state.OTCTradeList.slidePayTypeShow
})

const mapDispatchToProps = dispatch => ({
    hide:() => {
        dispatch({
            type:'OTCTradeList/hideSlide'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Slide, styles))
