import {Tabs} from 'antd-mobile'
import {connect} from 'dva'
import themes from '../../../utils/themes'

const OrderTabs = ({tabs,assignValue,type}) => (
    <Tabs
        tabs={tabs}
        // tabBarBackgroundColor={'#262834'}
        tabBarActiveTextColor={type === '买' ? themes.BuyColor : themes.SellColor}
        tabBarUnderlineStyle={type === '买' ? {borderColor:themes.BuyColor} : {borderColor:themes.SellColor}}
        onTabClick={assignValue}
    >

    </Tabs>
)

const mapStateToProps = state => ({
    tabs:state.OTCSubmitOrder.tabs,
    type:state.OTCSubmitOrder.type
})

const mapDispatchToProps = dispatch => ({
    assignValue:(tab,index) => {
        let value = ''
        if(index === 0){
            value = '买'
        }else{
            value = '卖'
        }
        dispatch({
            type:'OTCSubmitOrder/assignValue',
            key:'type',
            value:value
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OrderTabs)
