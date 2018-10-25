import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import {Flex, Modal} from 'antd-mobile'
import router from 'umi/router'
import themes from "../../../utils/themes";
import {connect} from 'dva'
import React from 'react'

const Item = ({item, reback,test}) => (
    <div styleName="container">
        <div onClick={() => {
            router.push({pathname: 'OTCMySubmitOrder', query: {no: item.单号}})
        }}>
            <Flex styleName="header">
                <div styleName="type-wrap">
                <span styleName="order-type"
                      style={item.类型 == '买' ? {backgroundColor: themes.BuyColor} : {backgroundColor: themes.SellColor}}>
                    {item.类型}
                </span>
                </div>
                <div styleName="name">
                    {item.下单时间}
                </div>
                <div styleName="status">{item.订单状态}</div>
            </Flex>
            <Flex styleName="detail">
                <div styleName="limit-num">
                    <div styleName="trade-num">
                        委托价格 {item.单价}
                    </div>
                    <div styleName="num" style={{marginTop: '12px'}}>
                        已成交量 {item.接单数}
                    </div>
                </div>
                <div styleName="limit-num">
                    <div styleName="limit">金额 {item.金额}</div>
                    <div styleName="num">委托数量 {item.数量}</div>
                </div>
            </Flex>
        </div>
        {item.订单状态 === '撤销' ? null :
            <Flex styleName='footer'>
                <div></div>
                <div styleName="reback" onClick={reback(item)}>撤销</div>
            </Flex>
        }
    </div>
)

const mapStateToProps = state => ({
    test:state.OTCTradeList.test
})

const mapDispatchToProps = dispatch => ({
    reback: item => () => {
        console.log(item)
        Modal.alert('确认撤销?', '', [
            {
                text: '取消', onPress: () => {

                }
            },
            {
                text: '确定', onPress: () => {
                    dispatch({
                        type:'OTCTradeList/cancel',
                        no:item.单号,
                        callback:() => {
                            dispatch({
                                type:'OTCTradeList/cancelCallBack',
                                no:item.单号,
                            })
                        }
                    })
                }
            }
        ])
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Item, styles))
