import * as Services from '../services/'
import {Modal} from 'antd-mobile'

export default {
    namespace: 'OTCSubmitOrderDetail',
    state: {
        no: '',
        infos: [
            {title: '总金额', value: '', key: '金额'},
            {title: '价格', value: '', key: '单价'},
            {title: '数量', value: '', key: '数量'},
            {title: '下单时间', value: '', key: '接单时间'},
            {title: '订单单号', value: '', key: '订单单号'},
            {title: '接单单号', value: '', key: '接单单号'},
            {title: '支付时间', value: '', key: '支付时间'},
            {title: '下单会员', value: '', key: '下单会员昵称'},
        ],
        data: {},
        inputPassword_show: false
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/OTCSubmitOrderDetail') {
                    dispatch({
                        type: 'assignNo',
                        no: query.no
                    })
                }
            })
        }
    },
    reducers: {
        toggleInputPassowrd(state) {
            return {
                ...state,
                inputPassword_show: !state.inputPassword_show
            }
        },
        assignInfos(state, {data}) {
            let infos = state.infos;
            for (let item of infos) {
                if (data[item.key]) {
                    item.value = data[item.key]
                }
            }
            return {
                ...state,
                infos: [...infos],
                data: data
            }
        },
        assignNo(state, {no}) {
            return {
                ...state,
                no: no
            }
        }
    },
    effects: {
        * getDetail({}, {call, select, put}) {
            const no = yield select(state => state.OTCSubmitOrderDetail.no)
            const {data} = yield call(Services.getDetail, {no: no})
            if (data) {
                yield put({
                    type: 'assignInfos',
                    data: data
                })
            }
        },
        * pay({}, {call, select, put}) {
            const no = yield select(state => state.OTCSubmitOrderDetail.no)
            const {data} = yield call(Services.pay, {no: no})
            if(data){
                Modal.alert('',data.信息,[
                    {text:'我知道了',onPress:() => {}}
                ])
            }
        },
        * shipments({},{call,select}){
            const order_data = yield select(state => state.OTCSubmitOrderDetail.data)
            const {data} = yield call(Services.shipments,{no:order_data.接单单号,remarks:''})
            if(data){
                Modal.alert('',data.信息,[
                    {text:'我知道了',onPress:() => {

                        }}
                ])
            }
        },
        //催款
        * urge({}, {call, select}) {
            const order_data = yield select(state => state.OTCSubmitOrderDetail.data)
            const {data} = yield call(Services.urge,{no:order_data.接单单号,remarks:''})
            if(data){
                Modal.alert('',data.信息,[
                    {text:'我知道了',onPress:() => {

                        }}
                ])
            }
        },
        * inter({}, {call}) {
            const {data} = yield call(Services.inter, {})
            console.log(data)
        },
        //同意平台转币
        * agree({pass}, {call, select}) {
            const no = yield select(state => state.OTCSubmitOrderDetail.no);
            const {data} = yield call(Services.agree, {no: no, pass: pass})
            if (data) {
                Modal.alert('', data.信息, [
                    {
                        text: '我知道了', onPress: () => {

                        }
                    }
                ])
            }
        },
    }
}
