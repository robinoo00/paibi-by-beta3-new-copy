import CSSModules from 'react-css-modules'
import styles from '../styles/position-list.less'
import {Flex, Modal, List, Button,InputItem} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'
import AlertItem from './ping-check-alert'
import LimitEarn from './limit-earn'

const PositionList = ({...rest}) => (
    <div styleName="wrap">
        <LimitEarn/>
        <AlertItem
            item={rest.item}
            hide={rest.hidePingModal}
            submit={rest.pingSubmit}
            visible={rest.visible}
        />
        {rest.list.map((item, index) => (
            <div styleName="item" key={"tradeList_" + index}>
                <div styleName="line1">
                    <div styleName="info">
                        <div styleName="info-item">
                            <span styleName="name">{item.合约}</span>
                            <span styleName="money">/{item.货币}</span>
                            <span styleName={item.方向 === "买入" ? "down" : "up"}>{item.方向 === "买入" ? "买" : "卖"}</span>
                            <span>×{item.数量}手</span>
                        </div>
                        <div styleName="info-item">
                            <span styleName="time">{item.开仓时间}</span>
                        </div>
                    </div>
                    <div styleName="action">
                        {/*<span styleName={item.浮动盈亏 > 0 ? "up-num" : "down-num"}>{item.浮动盈亏}</span>*/}
                        <span onClick={rest.showPingModal(item)} styleName="ping-btn">平仓</span>
                        <span onClick={rest.limitLose(item)} styleName="ping-btn">损盈</span>
                    </div>
                </div>
                <Flex styleName="price">
                    <Flex.Item styleName="price-item">
                        <p>{item.均价}</p>
                        <p>均价</p>
                    </Flex.Item>
                    <Flex.Item styleName="price-item">
                        <p>{item.当前价}</p>
                        <p>当前价</p>
                    </Flex.Item>
                    <Flex.Item styleName="price-item">
                        <p>{item.市场价}</p>
                        <p>市场价</p>
                    </Flex.Item>
                    <Flex.Item styleName="price-item">
                        <p styleName={item.浮动盈亏 > 0 ? "up-num" : "down-num"}>{item.浮动盈亏}</p>
                        <p>浮动盈亏</p>
                    </Flex.Item>
                </Flex>
            </div>
        ))}
    </div>
)

const mapStateToProps = state => ({
    list: state.tradeList.position_list.list,
    item: state.tradeList.ping_modal.data,
    visible: state.tradeList.ping_modal.visible
})

const mapDispatchToProps = dispatch => ({
    limitLose: item => () => {
        dispatch({
            type:'tradeList/showLimitEarn',
            data:item
        })
    },
    showPingModal: (item) => () => {
        dispatch({
            type:'tradeList/showPingModal',
            data:item
        })
    },
    hidePingModal: () => {
        dispatch({
            type:'tradeList/hidePingModal'
        })
    },
    pingSubmit:(num) => {
        dispatch({
            type:'tradeList/ping',
            num:num
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(PositionList, styles))
