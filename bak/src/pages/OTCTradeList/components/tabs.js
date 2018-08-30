import {Tabs} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import List from './list'
import ItemBuy from './item-buy'
import ItemSell from './item-sell'
import ItemTrade from './item-trade'
import router from 'umi/router'

class ListTabs extends React.Component{
    componentDidMount(){
        const {getList} = this.props
        getList()
    }
    render(){
        const {...rest} = this.props;
        return(
            <Tabs
                tabs={rest.tabs}
                renderTabBar={props => <div><Tabs.DefaultTabBar {...props} page={4} /></div>}
                initialPage={rest.tabs.indexOf(rest.tabs.filter(item => item.choose)[0])}
                swipeable={false}
                tabBarBackgroundColor={'#262834'}
                onChange={(tab, index) => {
                    // console.log('onChange', index, tab);
                }}
                onTabClick={rest.choose}
            >
                <List><ItemBuy/></List>
                <List><ItemSell/></List>
                <List><ItemTrade/></List>
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.OTCTradeList.tabs,
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type: 'OTCTradeList/getList',
        })
    },
    choose:(tab, index) => {
        if(index === 3){
            router.push('OTCMyReceiveOrders')
            return;
        }
        dispatch({
            type:'OTCTradeList/assignTabs',
            title:tab.title
        })
        dispatch({
            type: 'OTCTradeList/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ListTabs)
