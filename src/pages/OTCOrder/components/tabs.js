import {Tabs} from 'antd-mobile'
import {connect} from 'dva'

const OrderTabs = ({tabs,assignValue}) => (
    <Tabs
        tabs={tabs}
        // tabBarBackgroundColor={'#262834'}
        onTabClick={assignValue}
    >

    </Tabs>
)

const mapStateToProps = state => ({
    tabs:state.OTCOrder.tabs
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
            type:'OTCOrder/assignValue',
            key:'type',
            value:value
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OrderTabs)
