import React from 'react'
import {getFormatTime} from "../../utils/common"
import styles from './style.less'
import {Flex} from 'antd-mobile'

let id = 0

class CountDown extends React.Component{
    state = {
        value:'',
        stampTime:'',
        date:'',
        stop:false,
    }
    constructor(props){
        super(props)
        const value = props.value
        const order_stampTime = Date.parse(new Date(value))
        const now_stampTime = Date.parse(new Date())
        let stampTime = (order_stampTime + 900000) - now_stampTime
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
            }else{
                this.setState({
                    stop:true,
                })
            }
        },1000)
    }
    componentWillUnmount(){
        this._isMounted = false;
        clearInterval(id)
    }
    render(){
        if(this.state.stop){
            return null
        }else{
            return(
                <Flex className={styles.time}>
                    剩余{this.state.value}
                </Flex>
            )
        }
    }
}

export default CountDown
