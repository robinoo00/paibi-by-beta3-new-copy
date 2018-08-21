import {ListView} from 'antd-mobile'
import * as Services from '../services/'
import * as NewsDetailServices from "../../newsDetail/services/newsDetail";

export default {
    namespace:'OTCOrders',
    state:{
        tabs: [
            {title: "未完成", choose: false, name:'lis_unfinish'},
            {title: "已完成", choose: true, name:'lis_finish'},
            {title: "已取消", choose: false, name:'lis_cancel'},
        ],
        lis_unfinish:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            nomore:false
        },
        lis_finish:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            nomore:false
        },
        lis_cancel:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            nomore:false
        }
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
        assignList(state,{data}){
            const list_name = state.tabs.filter(item => item.choose)[0]['name']
            let list = state[list_name].data;
            let new_list = [];
            if(list._dataBlob){
                new_list = list._dataBlob.s1.concat(data);
            }else{
                new_list = data
            }
            state[list_name] = {
                ...state[list_name],
                data:list.cloneWithRows(new_list),
            }
            return{
                ...state,
            }
        }
    },
    effects:{
        *getList({},{put,select,call}){
            // const tabs = yield select(state => state.OTCTradeList.tabs)
            // const tab = tabs.filter(item => item.choose)
            // const {data} = yield call(NewsDetailServices.getNewsDetail, {id: 7});
            const {data} = yield call(Services.getList,{type:'买'});
            console.log(data);
            // const test = [{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2}]
            // yield put({
            //     type:'assignList',
            //     data:test
            // })
        },
        *loadMore({},{put}){
            const test = [{name:'test',age:2}]
            yield put({
                type:'assignList',
                data:test
            })
        },
    }
}
