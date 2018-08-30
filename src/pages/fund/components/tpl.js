import {connect} from 'dva'
import Header from '../../../components/header2/header'
import List from './list'
import React from 'react'
import DateChoose from './dateChoose'
import styles from '../styles/tpl.css'

class Example extends React.Component {
    render() {
        const {...rest} = this.props;
        return (
            <div>
                <Header
                    title={'出入明细'}
                    rightText={<span className={styles.calendar}></span>}
                    rightCallBack={rest.toggleDateFilter}
                />
                <DateChoose
                    submit={(start,end) => {rest.submit(start,end)}}
                    visible={rest.visible}
                    cancel={rest.cancelDateFilter}
                />
                <List/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    visible: state.fund.time_filter.visible
})

const mapDispatchToProps = (dispatch, props) => ({
    submit:(start,end) => {
        dispatch({
            type:'fund/dateFilter',
            start:start,
            end:end
        })
        dispatch({
            type:'fund/getList'
        })
    },
    cancelDateFilter: () => {
        dispatch({
            type: 'fund/cancelDateFilter'
        })
    },
    toggleDateFilter: () => {
        dispatch({
            type: 'fund/toggleDateFilter'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Example)

