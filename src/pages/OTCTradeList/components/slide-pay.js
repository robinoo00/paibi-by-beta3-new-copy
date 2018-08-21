import CSSModules from 'react-css-modules'
import styles from '../styles/slide-money.less'
import Slide from './slide'
import {connect} from 'dva'

const SlideMoney = ({choosePayType,list}) => (
    <Slide>
        <div styleName="container">
            {list.map(item => (
                <div
                    key={item.title}
                    styleName={item.choose ? 'choose' : ''}
                    onClick={choosePayType(item.title)}
                >{item.title}</div>
            ))}
        </div>
    </Slide>
)

const mapStateToProps = state => ({
    list:state.OTCTradeList.pay_list
})

const mapDispatchToProps = dispatch => ({
    choosePayType:title => () => {
        dispatch({
            type:'OTCTradeList/choosePayType',
            title:title
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(SlideMoney,styles))


