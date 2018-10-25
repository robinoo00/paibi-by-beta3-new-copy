import React from 'react'
import {getFormatTime} from "../../../utils/common";

let id = 0

class CountDown extends React.Component{
    state = {
        value:'',
        stampTime:'',
        date:''
    }
    constructor(props){
        super(props)
        const value = props.value
        const order_stampTime = Date.parse(new Date(value))
        const now_stampTime = Date.parse(new Date())
        let stampTime = (order_stampTime + 900000) - now_stampTime
        console.log('value',value)
        console.log('order_stampTime',order_stampTime)
        console.log('now_stampTime',now_stampTime)
        console.log('test',order_stampTime + 900000)
        console.log('stampTime',stampTime)
        this.state.date = props.date
        this.state.stampTime = stampTime
        this.state.value = getFormatTime(stampTime,'mm\'ss\"')
    }
    componentDidMount(){
        this._isMounted = true;
        let stampTime = this.state.stampTime
        id = setInterval(() => {
            if (stampTime > 0 ){
                stampTime -= 1000
                let value  = getFormatTime(stampTime,'mm\'ss\"')
                if(this._isMounted){
                    this.setState({
                        value:value,
                        stampTime:stampTime
                    })
                }
            }
        },1000)
    }
    componentWillUnmount(){
        this._isMounted = false;
        clearInterval(id)
    }
    render(){
        return(
            <span>
                {this.state.value}
            </span>
        )
    }
}

export default CountDown
