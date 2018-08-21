import {List} from 'antd-mobile'
import React from 'react'
import {connect} from 'dva'

class WalletList extends React.Component{
    componentDidMount(){
        const {getList} = this.props
        // getList()
    }
    render(){
        return(
            <List
                renderHeader={'资产明细'}
            >
                <List.Item
                    extra={'冻结 0'}
                >USDT</List.Item>
                <List.Item
                    extra={'冻结 0'}
                >USDT</List.Item>
                <List.Item
                    extra={'冻结 0'}
                >USDT</List.Item>
            </List>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type:'OTCWallet/getList'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WalletList)
