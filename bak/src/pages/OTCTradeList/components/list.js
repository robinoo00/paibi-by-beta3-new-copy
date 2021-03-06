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
        const hei = document.documentElement.clientHeight - 133;
        const {list, loadMore} = this.props;
        return (
            <div>
                <Filter/>
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
    list: state.OTCTradeList.list_buy
})

const mapDispatchToProps = dispatch => ({
    loadMore: () => {
        dispatch({
            type: 'OTCTradeList/loadMore',
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyList)
