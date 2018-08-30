import {List} from 'antd-mobile'
import React from 'react'
import {connect} from 'dva'
import {ListView} from 'antd-mobile'
import Loading from '../../../components/loading-nomore/bottom-tip'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";

const Item = List.Item;
const Brief = Item.Brief;


class WalletList extends React.Component {
    componentDidMount() {
        let {loadMore, getList} = this.props;
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
    }

    componentWillUnmount() {
        removeScrollListener()
    }

    render() {
        const {list, nomore} = this.props
        return (
            <List
                renderHeader={'资金明细'}
            >
                {list.map((item, index) => (
                    <Item
                        key={'my_wallet_' + index}
                        extra={<div><p className={item.金额 > 0 ? 'up-color' : 'down-color'}
                                       style={{fontSize: '.16rem'}}>{new Number(item.金额).toFixed(2)}</p>
                            <p>账号:{item.账号}</p></div>}
                    ><p style={{fontSize: '.16rem', color: '#999'}}>
                        {item.类型 === '劣后' ? '自有' : item.类型}
                        <span style={{marginLeft:'3px',fontSize:'14px'}} className={item.金额 > 0 ? 'up-color' : 'down-color'}>({item.金额 > 0 ? '入账' : '出账'})</span>
                        </p>
                        <Brief style={{fontSize: '.12rem'}}>{item.日期}</Brief>
                    </Item>
                ))}
                <Loading nomore={nomore}/>

            </List>
        )
    }
}

const mapStateToProps = state => ({
    list: state.myWallet.list,
    nomore: state.myWallet.nomore
})

const mapDispatchToProps = dispatch => ({
    getList: () => {
        dispatch({
            type: 'myWallet/getList'
        })
    },
    loadMore: () => {
        dispatch({
            type: 'myWallet/loadMore'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletList)
