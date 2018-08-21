import * as Services from '../services/'
export default {
    namespace:'OTCOrderDetail',
    state:{
        infos:[
            {title:'总金额',value:650,key:'test'},
            {title:'价格',value:6.5,key:'test2'},
            {title:'数量',value:100,key:'test3'},
            {title:'下单时间',value:'2018-06-04 12:23:28',key:'test4'},
            {title:'订单号',value:123456,key:'test5'},
            {title:'卖家',value:'张三',key:'test6'},
        ]
    },
    subscriptions:{},
    reducers:{},
    effects:{
        *cuikuan({},{call,select}){
            const infos = yield select(state => state.OTCOrderDetail.infos);
            const order_no = infos.filter(item => item['key'] === 'test5')[0]['value']
            const {data} = yield call(Services.cui,{})
            console.log(data)
        },
        *inter({},{call}){
            const {data} = yield call(Services.inter,{})
            console.log(data)
        }
    }
}
