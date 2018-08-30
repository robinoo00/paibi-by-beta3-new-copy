import * as Services from '../services/'
let loading = false;

export default {
    namespace:'OTCWallet',
    state:{
        info:[
            {title:'可用余额',value:10000.00,key:'可用币'},
            {title:'冻结余额',value:10000.00,key:'冻结币'}
        ],
        details:{
            list: [],
            page: 0,
            nomore: false
        },
        hide:false
    },
    subscriptions:{},
    reducers:{
        assignList(state, {data, page}) {
            let nomore = false;
            if (data.length === 0 || data.length < 30) {
                nomore = true;
            }
            if (page === 1) {
                state['details'] = {
                    list: data,
                    page: 1,
                    nomore: nomore
                }
                return {
                    ...state,
                }
            } else {
                state['details'] = {
                    list: [...state['details'].list, ...data],
                    page: page,
                    nomore: nomore
                }
                return {
                    ...state,
                }
            }
        },
        assignHide(state){
            return {
                ...state,
                hide:!state.hide
            }
        }
    },
    effects:{
        *getList({page = 1},{call,put}){
            const {data} = yield call(Services.getList,{page:page})
            loading = false;
            if (data) {
                yield put({
                    type: 'assignList',
                    data: data,
                    page: page,
                })
            }
        },
        * loadMore({}, {put, select}) {
            if (!loading) {
                const details = yield select(state => state.OTCWallet.details)
                if(!details.nomore){
                    yield put({
                        type:'getList',
                        page:details.page + 1
                    })
                }
                loading = true;
            }
        }
    }
}
