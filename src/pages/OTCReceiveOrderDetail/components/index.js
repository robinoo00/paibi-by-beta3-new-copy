import Header from '../../../components/header2/header'
import theme from '../../../utils/themes'
import Info from './info'
import Action from './action'
import Time from './time'
import Submit from './submit'
import {connect} from 'dva'
import React from 'react'

let id = 0

class Index extends React.Component{
    componentDidMount(){
        const {getDetail} = this.props;
        getDetail()
        id = setInterval(() => {
            getDetail()
        },1000)
    }
    componentWillUnmount(){
        clearInterval(id)
    }
    render(){
        const {...rest} = this.props
        return(
            <div>
                <Header
                    title={'订单详情'}
                    rightText={<div style={{color:theme.Theme2BlueColor}}>帮助</div>}
                />
                <Info/>
                {rest.data.类型 === '出售' && rest.data.接单状态 === '已接单未付款' ? <Submit/> :
                    null
                }
                {rest.data.类型 === '出售' && rest.data.接单状态 === '已接单已付款' ? <Submit/> :
                    null
                }
                {rest.data.类型 === '购买' && rest.data.接单状态 === '已接单未付款' ?
                    <div>
                        <Action/>
                        <Time/>
                        <Submit/>
                    </div>
                    :
                    null
                }
                {rest.data.类型 === '购买' && rest.data.接单状态 === '已接单已付款' ?
                    <Submit/>
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data:state.OTCReceiveOrderDetail.data
})

const mapDispatchToProps = dispatch => ({
    getDetail:() => {
        dispatch({
            type:'OTCReceiveOrderDetail/getDetail'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)
