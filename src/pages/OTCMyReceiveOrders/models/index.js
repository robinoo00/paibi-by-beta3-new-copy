import {ListView} from 'antd-mobile'
import * as Services from '../services/'

export default {
    namespace:'OTCMyReceiveOrders',
    state:{
        tabs: [
            {title: "未付款", choose: true, name:'list_unpay',state:0},
            {title: "已付款", choose: false, name:'list_pay',state:1},
            {title: "已完成", choose: false, name:'list_finish',state:2}
            // {title: "未完成", choose: false, name:'lis_unfinish'},
            // {title: "已取消", choose: false, name:'lis_cancel'},
        ],
        list_unpay:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list:[],
            page:0,
            nomore:false
        },
        list_pay:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list:[],
            page:0,
            nomore:false
        },
        // lis_unfinish:{
        //     data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        //     nomore:false
        // },
        list_finish:{
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
    subscriptions:{},
    reducers:{
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
            const tabs = yield select(state => state.OTCMyReceiveOrders.tabs)
            const tab = tabs.filter(item => item.choose)[0]
            const {data} = yield call(Services.getList,{state:tab.state,page:page});
            // const test = [{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2}]
            if(data){
                yield put({
                    type:'assignList',
                    data:data,
                    page:page
                })
            }
        },
        *loadMore({},{put,select}){
            const tabs = yield select(state => state.OTCMyReceiveOrders.tabs)
            const tab = tabs.filter(item => item.choose)[0]
            const list_data = yield select(state => state.OTCMyReceiveOrders[tab['name']])
            const nomore = list_data['nomore']
            if(!nomore){
                yield put({
                    type:'getList',
                    page:list_data['page']
                })
            }
        },
    }
}
