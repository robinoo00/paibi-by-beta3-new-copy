import * as Services from '../services/'
import {Toast,Modal} from 'antd-mobile'
import router from 'umi/router'

export default {
    namespace:'OTCOrder',
    state:{
        tabs:[
            {title:'我要购买',value:'1'},
            {title:'我要出售',value:'2'}
        ],
        type:'买',
        price:'',
        total:'',
        num:'',
    },
    subscriptions:{},
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
            const state = yield select(state => state.OTCOrder)
            values.type=state.type;
            const {data} = yield call(Services.order,values)
            result(data)
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
