import * as Services from '../services/'
import {Toast,Modal} from 'antd-mobile'
import router from 'umi/router'

export default {
    namespace:'OTCSubmitOrder',
    state:{
        tabs:[
            {title:'我要购买',value:'1'},
            {title:'我要出售',value:'2'}
        ],
        type:'买',
        price:'',
        total:'',
        num:'',
        min:'',
        max:''
    },
    subscriptions:{
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/OTCSubmitOrder') {
                    dispatch({
                        type: 'personal/getInfo'
                    })
                }
            })
        }
    },
    reducers:{
        assignValue(state,{key,value}){
            state[key] = value
            let total = state.total
            if(state.num && state.price){
                total = state.num * state.price
            }else{
                total = ''
            }
            state.total = total
            return {
                ...state,
            }
        },
    },
    effects:{
        *submit({values},{call,put,select}){
            const info = yield select(state => state.personal.info)
            if(info.支付宝账号){
                const state = yield select(state => state.OTCSubmitOrder)
                values.type=state.type;
                const {data} = yield call(Services.order,values)
                result(data)
            }else{
                router.push('OTCWalletSettings')
            }
        }
    }
}

function result(data){
    if(data){
        if(data.状态){
            Modal.alert('提示',data.信息,[
                {text:'我知道了',onPress:() => {router.push('OTCTradeList')}}
            ])
        }else{
            Toast.info(data.信息)
        }
    }
}
