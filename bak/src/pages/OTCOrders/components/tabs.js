import {Tabs} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'

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
                tabBarBackgroundColor={'#262834'}
                onChange={(tab, index) => {
                    // console.log('onChange', index, tab);
                }}
                onTabClick={rest.choose}
            >

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
            type: 'OTCMyReceiveOrders/getList',
        })
    },
    choose:(tab, index) => {
        dispatch({
            type:'OTCMyReceiveOrders/assignTabs',
            title:tab.title
        })
        dispatch({
            type: 'OTCMyReceiveOrders/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OrdersTabs)
