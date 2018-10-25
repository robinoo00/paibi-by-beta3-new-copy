import * as Services from '../services/common'

export default {
    namespace: 'common',
    state: {
        showInputPassword:false,
        rate:null
    },
    subscriptions: {
    },

    effects: {
        * getRate({},{call,put}){
            const {data} = yield call(Services.getRate)
            if(data){
                yield put({
                    type:'assignExchangeRate',
                    value:data.汇率
                })
            }
        }
    },

    reducers: {
        showInputPassword(state){
            return {
                ...state,
                showInputPassword: true
            }
        },
        hideInputPassword(state){
            return {
                ...state,
                showInputPassword: false
            }
        },
        assignExchangeRate(state,{value}){
            return {
                ...state,
                rate:'￥' + value
            }
        }
    },

};
