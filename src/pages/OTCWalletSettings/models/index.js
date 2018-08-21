import config from "../../../utils/config";

export default {
    namespace:'OTCWalletSettings',
    state:{
        list:[
            {title:'支付宝',style:'alipay',styleChecked:'alipay-check',extra:'未设置',setting:false,key:config.ALIPAY}
        ]
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query}) => {
                if(pathname === '/OTCWalletSettings'){
                    dispatch({
                        type:'checkList'
                    })
                }
            })
        }
    },
    reducers:{
        assignList(state,{data}){
            console.log(data)
            let list = state.list;
            if(data.支付宝账号){
                list[0]['setting'] = true
                list[0]['extra'] = data.支付宝账号
            }
            return {
                ...state,
                list:[...list]
            }
        }
    },
    effects:{
        *checkList({},{put,select}){
            const info = yield select(state => state.personal.info)
            yield put({
                type:'assignList',
                data:info
            })
        }
    }
}
