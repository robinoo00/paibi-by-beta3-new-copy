import * as Services from '../services/'
import {Modal} from 'antd-mobile'
import router from 'umi/router'
import {FormatAfterDotNumber} from '../../../utils/common'

export default {
    namespace: 'OTCTradeDetail',
    state: {
        data:{},
        price: null,
        type: 1,//1买 2，卖
        no: null, //订单编号
        money: null,
        num: null
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/OTCTradeDetail') {
                    dispatch({
                        type: 'personal/getInfo'
                    })
                    dispatch({
                        type: 'init',
                        price: query.price,
                        no: query.no
                    })
                    dispatch({
                        type:'getDetail',
                    })
                }
            })
        },
    },
    reducers: {
        assignData(state,{data}){
            return {
                ...state,
                data:data
            }
        },
        assignValue(state, {key, value}) {
            state[key] = value
            if (key === 'money') {
                state.num = value ? FormatAfterDotNumber((value / state.price),2) : null
            }
            if (key === 'num') {
                state.money = value ? FormatAfterDotNumber((value * state.price),2) : null
            }
            return {
                ...state
            }
        },
        init(state, {no, price}) {
            return {
                ...state,
                price: price,
                no: no
            }
        },
        total(state){
            return {
                ...state,
                num:state.data.数量,
                money:state.data.数量 * state.data.单价
            }
        }
    },
    effects: {
        * getDetail({},{call,select,put}){
            const no = yield select(state => state.OTCTradeDetail.no)
            const {data} = yield call(Services.getDetail,{no:no})
            if(data){
                yield put({
                    type:'assignData',
                    data:data
                })
            }
        },
        * submit({value}, {select, call}) {
            const info = yield select(state => state.personal.info)
            if(info.支付宝账号){
                const no = yield select(state => state.OTCTradeDetail.no)
                const num = yield select(state => state.OTCTradeDetail.num)
                const post_data = {
                    number: num,
                    no: no
                }
                const {data} = yield call(Services.order, post_data)
                if (data) {
                    Modal.alert('', data.信息, [
                        {
                            text: '我知道了', onPress: () => {
                                if (data.状态) {
                                    router.push('OTCMyReceiveOrders')
                                } else {

                                }
                            }
                        }
                    ])
                }
            }else{
                router.push('OTCWalletSettings')
            }
        }
    }
}
