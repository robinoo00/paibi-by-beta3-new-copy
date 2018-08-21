export default {
    namespace:'OTCTradeDetail',
    state:{
        price:1,
        type:1,//1买 2，卖
    },
    subscriptions:{

    },
    reducers:{

    },
    effects:{
        *submit({},{select,call}){
            const type = yield select(state => state.OTCTradeDetail.type)
        }
    }
}
