import {ListView} from 'antd-mobile'
import * as Services from '../services/'

export default {
    namespace:'OTCMySubmitOrder',
    state:{
        no:null,
        tabs: [
            {title: "未付款", choose: true, name:'lis_unpay',state:0},
            {title: "已付款", choose: false, name:'lis_pay',state:1},
            {title: "已完成", choose: false, name:'lis_finish',state:2}
            // {title: "未完成", choose: false, name:'lis_unfinish'},
            // {title: "已取消", choose: false, name:'lis_cancel'},
        ],
        lis_unpay:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list:[],
            page:0,
            nomore:false
        },
        lis_pay:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list:[],
            page:0,
            nomore:false
        },
        // lis_unfinish:{
        //     data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        //     nomore:false
        // },
        lis_finish:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list:[],
            page:0,
            nomore:false
        },
        // lis_cancel:{
        //     data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        //     nomore:false
        // }
    },
    subscriptions:{
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/OTCMySubmitOrder') {
                    dispatch({
                        type: 'assignNo',
                        no: query.no
                    })
                }
            })
        },
    },
    reducers:{
        assignNo(state,{no}){
            return{
                ...state,
                no:no
            }
        },
        assignTabs(state,{title}){
            let tabs = state.tabs;
            for(let item of tabs){
                item['choose'] = false
                if((item['title']) === title) item['choose'] = true
            }
            return {
                ...state,
                tabs:[...tabs]
            }
        },
        assignList(state,{data,page}){
            const list_name = state.tabs.filter(item => item.choose)[0]['name']
            let nomore = state[list_name].nomore;
            let list = state[list_name].list;
            let old_data = state[list_name].data;
            let new_list
            if(page === 1){
                new_list = data
            }else{
                new_list = list.concat(data)
            }
            if(data.length < 30 ){
                nomore = true
            }
            state[list_name] = {
                ...state[list_name],
                data:old_data.cloneWithRows(new_list),
                list:new_list,
                nomore:nomore,
                page:page
            }
            return{
                ...state,
            }
        }
    },
    effects:{
        *getList({page = 1},{put,select,call}){
            const tabs = yield select(state => state.OTCMySubmitOrder.tabs)
            const no = yield select(state => state.OTCMySubmitOrder.no)
            const tab = tabs.filter(item => item.choose)[0]
            const {data} = yield call(Services.getList,{state:tab.state,no:no,page:page});
            // const test = [{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2}]
            yield put({
                type:'assignList',
                data:data,
                page:page
            })
        },
        *loadMore({},{put,select}){
            const tabs = yield select(state => state.OTCMySubmitOrder.tabs)
            const tab = tabs.filter(item => item.choose)[0]
            const state = yield select(state => state.OTCMySubmitOrder)
            const page = state[tab['name']]['page']
            const nomore = state[tab['name']]['nomore']
            if(!nomore){
                yield put({
                    type:'getList',
                    page:page + 1
                })
            }
        },
    }
}
