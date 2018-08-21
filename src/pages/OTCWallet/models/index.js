import * as Services from '../services/'
export default {
    namespace:'OTCWallet',
    state:{
        info:[
            {title:'可用余额',value:10000.00},
            {title:'冻结余额',value:10000.00}
        ],
        hide:false
    },
    subscriptions:{},
    reducers:{
        assignHide(state){
            return {
                ...state,
                hide:!state.hide
            }
        }
    },
    effects:{
        *getList({},{call}){
            const {data} = yield call(Services.getList,{})
            console.log(data)
        }
    }
}
