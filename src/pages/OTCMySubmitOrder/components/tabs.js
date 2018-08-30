import {Tabs} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import List from './list'
import Item from './item'

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
                <List><Item/></List>
                <List><Item/></List>
                <List><Item/></List>
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    tabs:state.OTCMySubmitOrder.tabs,
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type: 'OTCMySubmitOrder/getList',
        })
    },
    choose:(tab, index) => {
        dispatch({
            type:'OTCMySubmitOrder/assignTabs',
            title:tab.title
        })
        dispatch({
            type: 'OTCMySubmitOrder/getList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OrdersTabs)
