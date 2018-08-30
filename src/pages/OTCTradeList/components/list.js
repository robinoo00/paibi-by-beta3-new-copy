import React from 'react'
import {ListView} from 'antd-mobile'
import {connect} from 'dva'
import Loading from '../../../components/loading-nomore/bottom-tip'
import Filter from './filter'

class BuyList extends React.Component {
    renderRow = (item) => {
        return React.cloneElement(this.props.children, { item: item })
    }
    render() {
        const hei = document.documentElement.clientHeight - 140;
        const {...rest} = this.props;
        const list_name = rest.tabs.filter(item => item.choose)[0]['name']
        const list = rest[list_name]
        return (
            <div>
                {/*<Filter/>*/}
                <ListView
                    dataSource={list.data}
                    renderRow={this.renderRow}
                    onEndReached={rest.loadMore}
                    onEndReachedThreshold={50}
                    onScroll={(test) => {
                        // console.log(test);
                    }}
                    scrollRenderAheadDistance={500}
                    renderFooter={() => <Loading nomore={list.nomore}/>}
                    showsVerticalScrollIndicator={false}
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
    tabs:state.OTCTradeList.tabs,
    list_buy:state.OTCTradeList.list_buy,
    list_sell:state.OTCTradeList.list_sell,
    list_trade:state.OTCTradeList.list_trade,
})

const mapDispatchToProps = dispatch => ({
    loadMore: () => {
        dispatch({
            type: 'OTCTradeList/loadMore',
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyList)
