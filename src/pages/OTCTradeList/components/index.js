import Header from './header'
import Tabs from './tabs'
import SlideMoney from './slide-money'
import SlidePay from './slide-pay'
import {connect} from 'dva'
import OrderBtn from './orderBtn'

const Index = ({slideMoneyShow,slidePayTypeShow}) => (
    <div className={'list'}>
        <Header/>
        <Tabs/>
        {slideMoneyShow ? <SlideMoney/> : null}
        {slidePayTypeShow ? <SlidePay/> : null}
        <OrderBtn/>
    </div>
)

const mapStateToProps = state => ({
    slideMoneyShow:state.OTCTradeList.slideMoneyShow,
    slidePayTypeShow:state.OTCTradeList.slidePayTypeShow
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(Index)
