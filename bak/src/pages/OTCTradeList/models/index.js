import {ListView} from 'antd-mobile'

export default {
    namespace:'OTCTradeList',
    state:{
        tabs: [
            {title: "购买", choose: true, name:'list_buy'},
            {title: "出售", choose: false, name:'list_sell'},
            {title: "交易单", choose: false, name:'list_trade'},
            {title: "订单", choose: false, name:''},
        ],
        filters:[
            {title:'认证商家',key:'auth',choose:false,style:'item-check',chooseStyle:'item-checked'},
            {title:'所有金额',key:'money',choose:false,style:'item-slide',chooseStyle:'item-slide-checked'},
            {title:'所有方式',key:'pay',choose:false,style:'item-slide',chooseStyle:'item-slide-checked'},
        ],
        money_list:[
            {title:'所有金额', choose: true},
            {title:'5万以上', choose: false},
            {title:'10万以上', choose: false},
            {title:'20万以上', choose: false}
        ],
        pay_list:[
            {title:'所有方式', choose: true},
            {title:'银行转账', choose: false},
            {title:'支付宝', choose: false},
            {title:'微信', choose: false}
        ],
        slideMoneyShow:false,
        slidePayTypeShow:false,
        list_buy:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            nomore:false,
            test:1
        },
        list_sell:{
            data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            nomore:false
        },
        list_trade:{
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
        assignFilters(state,{key}){
          let list = state.filters
          for(let item of list){
              item['choose'] = false
              if(item['key'] === key){
                  item['choose'] = true
              }
          }
          return {
              ...state,
              filters:[...list]
          }
        },
        showMoneySlide(state){
            return{
                ...state,
                slideMoneyShow:!state.slideMoneyShow,
                slidePayTypeShow:false
            }
        },
        showPaySlide(state){
            return{
                ...state,
                slidePayTypeShow:!state.slidePayTypeShow,
                slideMoneyShow:false
            }
        },
        hideSlide(state){
            return{
                ...state,
                slideMoneyShow:false,
                slidePayTypeShow:false
            }
        },
        chooseMoneyType(state,{title}) {
            let list = state.money_list;
            for (let item of list){
                item['choose'] = false;
                if(title === item['title']) item['choose'] = true
            }
            return {
                ...state,
                money_list:[...list]
            }
        },
        choosePayType(state,{title}){
            let list = state.pay_list;
            for (let item of list){
                item['choose'] = false;
                if(title === item['title']) item['choose'] = true
            }
            return {
                ...state,
                pay_list:[...list]
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
        *getList({},{put,select}){
            const tabs = yield select(state => state.OTCTradeList.tabs)
            const tab = tabs.filter(item => item.choose)
            const test = [{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2},{name:'test',age:2}]
            yield put({
                type:'assignList',
                data:test
            })
        },
        *loadMore({},{put,select}){
            const tabs = yield select(state => state.OTCTradeList.tabs)
            const tab = tabs.filter(item => item.choose)
            const test = [{name:'test',age:2}]
            yield put({
                type:'assignList',
                data:test
            })
        },
        *chooseFilter({},{put,select}){
            const list = yield select(state => state.OTCTradeList.filters)
            console.log(list);
            const key = list.filter(item => item.choose)[0]['key']
            switch (key) {
                case 'auth':
                    yield put({
                        type:'assignAuth'
                    })
                    yield put({
                        type:'hideSlide'
                    })
                    break
                case 'money':
                    yield put({
                        type:'showMoneySlide'
                    })
                    break
                case 'pay':
                    yield put({
                        type:'showPaySlide'
                    })
                    break
            }
        }
    }
}
