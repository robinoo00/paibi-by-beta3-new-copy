import CSSModules from 'react-css-modules'
import styles from '../styles/slide-money.less'
import Slide from './slide'
import {connect} from 'dva'

const SlideMoney = ({chooseMoneyType,list}) => (
    <Slide>
        <div styleName="container">
            {list.map(item => (
                <div
                    key={item.title}
                    styleName={item.choose ? 'choose' : ''}
                    onClick={chooseMoneyType(item.title)}
                >{item.title}</div>
            ))}
        </div>
    </Slide>
)

const mapStateToProps = state => ({
    list:state.OTCTradeList.money_list
})

const mapDispatchToProps = dispatch => ({
    chooseMoneyType:title => () => {
        dispatch({
            type:'OTCTradeList/chooseMoneyType',
            title:title
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(SlideMoney,styles))


