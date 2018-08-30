import {Tabs} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import List from './list'
import ItemBuy from './item-buy'
import ItemSell from './item-sell'
import ItemTrade from './item-trade'
import router from 'umi/router'

let id = 0

class ListTabs extends React.Component{
    componentDidMount(){
        const {getList,refresh} = this.props
        getList()
        id = setInterval(() => {
            refresh()
        },3000)

    }
    componentWillUnmount(){
        const {clearList} = this.props;
        clearList()
        clearInterval(id)
    }
    render(){
        const {...rest} = this.props;
        return(
            <Tabs
                tabs={rest.tabs}
                renderTabBar={props => <div><Tabs.DefaultTabBar {...props} page={4} /></div>}
                initialPage={rest.tabs.indexOf(rest.tabs.filter(item => item.choose)[0])}
                swipeable={false}
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
    refresh:() => {
        dispatch({
            type: 'OTCTradeList/refresh',
        })
    },
    clearList: () => {
        dispatch({
            type: 'OTCTradeList/clearList',
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
