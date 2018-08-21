import {List} from 'antd-mobile'
import React from 'react'
import {connect} from 'dva'
import {ListView} from 'antd-mobile'
import Loading from '../../../components/loading-nomore/bottom-tip'

const Item = List.Item;
const Brief = Item.Brief;


class WalletList extends React.Component{
    componentDidMount(){
        const {getList} = this.props;
        getList();
    }
    renderRow = (item) => {
         return <Item
            extra={<div><p className={item.金额 > 0 ? 'up-color' : 'down-color'}
                           style={{fontSize: '.16rem'}}>{new Number(item.金额).toFixed(2)}</p><p>账号:{item.账号}</p></div>}
        ><p style={{fontSize: '.16rem', color: '#999'}}>{item.类型}</p>
            <Brief style={{fontSize: '.12rem'}}>{item.日期}</Brief>
        </Item>
    }
    render(){
        const hei = document.documentElement.clientHeight - 370;
        const {...rest} = this.props
        return(
            <List
                renderHeader={'资金明细'}
            >
                <ListView
                    dataSource={rest.dataSource}
                    renderRow={this.renderRow}
                    onEndReached={rest.loadMore}
                    onEndReachedThreshold={200}
                    onScroll={(test) => {
                        // console.log(test);
                    }}
                    scrollRenderAheadDistance={100}
                    pageSize={3}
                    renderFooter={() => <Loading nomore={rest.nomore}/>}
                    showsVerticalScrollIndicator={false}
                    style={{
                        height: hei + 'px',
                        overflow: 'auto',
                    }}
                />
            </List>
        )
    }
}

const mapStateToProps = state => ({
    dataSource:state.myWallet.dataSource,
    nomore:state.myWallet.nomore
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type:'myWallet/getList'
        })
    },
    loadMore:() => {
        console.log(123)
        dispatch({
            type:'myWallet/loadMore'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WalletList)
