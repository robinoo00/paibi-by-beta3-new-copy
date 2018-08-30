import {List} from 'antd-mobile'
import React from 'react'
import {connect} from 'dva'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common"
import Loading from '../../../components/loading-nomore/bottom-tip'

class WalletList extends React.Component{
    componentDidMount(){
        let {loadMore,getList} = this.props;
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
    }
    componentWillUnmount(){
        removeScrollListener()
    }
    render(){
        const {list,nomore} = this.props
        return(
            <List
                renderHeader={'资产明细'}
            >
                {list.map((item,index) => (
                    <List.Item
                        key = {'otc_details_' + index}
                        extra={'冻结 '+ item.余冻结}
                    ><div style={{fontSize:'12px'}}>{item.时间}</div></List.Item>
                ))}
                <Loading nomore={nomore}/>
            </List>
        )
    }
}

const mapStateToProps = state => ({
    list:state.OTCWallet.details.list,
    nomore:state.OTCWallet.details.nomore
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type:'OTCWallet/getList'
        })
    },
    loadMore:() => {
        console.log(123)
        dispatch({
            type:'OTCWallet/loadMore'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WalletList)
