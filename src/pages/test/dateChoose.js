import {Flex,DatePicker,Button, Toast} from 'antd-mobile'
import styles from '../fund/styles/dateChoose.less'
import React from 'react'
import {getFormatTime} from "../../utils/common";

class DateChoose extends React.Component{
    state = {
        startTime:'',
        startStamp:0,
        endTime:'',
        endStamp:0,
        startChoose:false,
        endChoose:false
    }
    _choose = (key) => () => {
        let state = this.state
        state['startChoose'] = false
        state['endChoose'] = false
        state[key] = true
        this.setState(state)
    }
    _search = () => {
        const state = this.state
        console.log(state.startStamp)
        console.log(state.endStamp)
        const {submit} = this.props
        if(parseInt(state.startStamp) >= parseInt(state.endTime)){
            Toast.info('所选时间有误')
        }else{
            submit(state.startTime,state.endTime)
        }
    }
    _pick = (val) => {
        const stamp = Date.parse(new Date(val))
        const form_date = getFormatTime(stamp)
        const state = this.state
        if(state.startChoose){
            this.setState({
                startTime:form_date,
                startStamp:stamp/1000
            })
        }
        if(state.endChoose){
            this.setState({
                endTime:form_date,
                endStamp:stamp/1000
            })
        }
    }
    render(){
        return(
            <Flex className={styles.container}>
                <Flex className={styles['date-wrap']}>
                    <DatePicker
                        mode="year"
                        title="选择日期"
                        // onChange={this._pick}
                    >
                        <div
                            onClick={this._choose('startChoose')}
                            className={this.state.startChoose ? styles['date-input-choose']  : styles['date-input']}>
                            {this.state.startTime}
                        </div>
                    </DatePicker>
                    <div>至</div>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        // onChange={this._pick}
                    >
                        <div
                            onClick={this._choose('endChoose')}
                            className={this.state.endChoose ? styles['date-input-choose']  : styles['date-input']}>
                            {this.state.endTime}
                        </div>
                    </DatePicker>
                </Flex>
                <div className={styles.search}>
                    <Button type={'primary'} size={'small'} onClick={this._search}>搜索</Button>
                </div>
            </Flex>
        )
    }
}

export default DateChoose
