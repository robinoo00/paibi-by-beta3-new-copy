import {ListView} from 'antd-mobile'
import * as Services from "..//services/";
let loading = false;

export default {
    namespace:'myWallet',
    state:{
        info:[
            {title:'可用余额',value:10000.00},
            {title:'冻结余额',value:10000.00}
        ],
        hide:false,
        dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        list:[],
        nomore:false,
        page:0
    },
    subscriptions:{},
    reducers:{
        assignHide(state){
            return {
                ...state,
                hide:!state.hide
            }
        },
        assignList(state,{data,page}){
            let new_list = [];
            let nomore = false
            if(data.length < 30) nomore = true
            if(page === 1){
                new_list = data
            }else{
                new_list = state.list.concat(data)
            }
            return {
                ...state,
                list:[...new_list],
                // dataSource:state.dataSource.cloneWithRows(new_list),
                page:page,
                nomore:nomore
            }
        }
    },
    effects:{
        *getList({page = 1},{put,select,call}){
            const {data} = yield call(Services.getList,{page:page})
            loading = false;
            if(data){
                yield put({
                    type:'assignList',
                    data:data.data,
                    page:page
                })
            }
        },
        *loadMore({},{put,select}){
            if (!loading) {
                const page = yield select(state => state.myWallet.page)
                const nomore = yield select(state => state.myWallet.nomore)
                if(!nomore){
                    yield put({
                        type:'getList',
                        page:page + 1
                    })
                }
                loading = true;
            }
        },
    }
}
