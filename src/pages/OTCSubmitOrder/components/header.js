import Header from '../../../components/header2/header'
import {connect} from 'dva'
import React from 'react'

let id = 0

class SubmitOrderHeader extends React.Component{
    componentDidMount(){
        const {getRate} = this.props
        id = setInterval(() => {
            getRate()
        },3000)
    }
    componentWillUnmount(){
        clearInterval(id)
    }
    render(){
        const {rate} = this.props
        return(
            <Header
                title={'发布交易单'}
                rightText={rate}
            />
        )
    }
}

const mapStateToProps = state => ({
    rate:state.common.rate
})

const mapDispatchToProps = dispatch => ({
    getRate:() => {
        dispatch({
            type:'common/getRate'
        })
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(SubmitOrderHeader)
