import React from 'react'
import {ListView} from 'antd-mobile'
import {connect} from 'dva'
import Loading from '../../../components/loading-nomore/bottom-tip'

class BuyList extends React.Component {
    componentDidMount(){
        const {getList} = this.props;
        getList();
        // window.document.body.addEventListener('touchmove',() => {
        //     console.log(123)
        // })
    }
    renderRow = (item) => {
        return React.cloneElement(this.props.children, { item: item })
    }

    render() {
        const hei = document.documentElement.clientHeight - 133;
        const {list, loadMore} = this.props;
        return (
            <div>
                <ListView
                    dataSource={list.data}
                    renderRow={this.renderRow}
                    onEndReached={loadMore}
                    onEndReachedThreshold={50}
                    onScroll={(test) => {
                        // console.log(test);
                    }}
                    scrollRenderAheadDistance={500}
                    renderFooter={() => <Loading nomore={list.nomore}/>}
                    // showsVerticalScrollIndicator={false}
                    style={{
                        height: hei + 'px',
                        overflow: 'auto',
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.OTCOrders[state.OTCOrders.tabs.filter(item => item.choose)[0]['name']]
})

const mapDispatchToProps = dispatch => ({
    getList: () => {
        dispatch({
            type: 'OTCOrders/getList',
        })
    },
    loadMore: () => {
        dispatch({
            type: 'OTCOrders/loadMore',
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyList)
