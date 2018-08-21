import {Tabs} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import List from './list'
import ItemFinish from './item-finish'

class OrdersTabs extends React.Component{
    componentDidMount(){
        const {getList} = this.props;
        getList()
    }
    render(){
        const {...rest} = this.props;
        return(
            <Tabs
                tabs={rest.tabs}
                renderTabBar={props => <div><Tabs.DefaultTabBar {...props} page={3} /></div>}
                initialPage={rest.tabs.indexOf(rest.tabs.filter(item => item.choose)[0])}
                swipeable={false}
                // tabBarBackgroundColor={'#262834'}
                onChange={(tab, index) => {
                    // console.log('onChange', index, tab);
                }}
                onTabClick={rest.choose}
            >
                <List><ItemFinish/></List>
                <List><ItemFinish/></List>
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.OTCOrders.tabs,
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type: 'OTCOrders/getList',
        })
    },
    choose:(tab, index) => {
        dispatch({
            type:'OTCOrders/assignTabs',
            title:tab.title
        })
        dispatch({
            type: 'OTCOrders/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OrdersTabs)
