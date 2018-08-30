import {ListView, Modal} from 'antd-mobile'
import * as Services from '../services/'

export default {
    namespace: 'OTCTradeList',
    state: {
        tabs: [
            {title: "购买", choose: true, name: 'list_buy', type: '买'},
            {title: "出售", choose: false, name: 'list_sell', type: '卖'},
            {title: "交易单", choose: false, name: 'list_trade', type: '交易'},
            {title: "订单", choose: false, name: ''},
        ],
        filters: [
            {title: '认证商家', key: 'auth', choose: false, style: 'item-check', chooseStyle: 'item-checked'},
            {title: '所有金额', key: 'money', choose: false, style: 'item-slide', chooseStyle: 'item-slide-checked'},
            {title: '所有方式', key: 'pay', choose: false, style: 'item-slide', chooseStyle: 'item-slide-checked'},
        ],
        money_list: [
            {title: '所有金额', choose: true},
            {title: '5万以上', choose: false},
            {title: '10万以上', choose: false},
            {title: '20万以上', choose: false}
        ],
        pay_list: [
            {title: '所有方式', choose: true},
            {title: '银行转账', choose: false},
            {title: '支付宝', choose: false},
            {title: '微信', choose: false}
        ],
        slideMoneyShow: false,
        slidePayTypeShow: false,
        list_buy: {
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list: [],
            page: 0,
            nomore: false,
        },
        list_sell: {
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list: [],
            page: 0,
            nomore: false
        },
        list_trade: {
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list: [],
            page: 0,
            nomore: false
        },
        test: 1
    },
    subscriptions: {},
    reducers: {
        clearList(state) {
            return {
                ...state,
                list_buy: {
                    data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                    nomore: false,
                },
                list_sell: {
                    data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                    nomore: false
                },
                list_trade: {
                    data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                    nomore: false
                }
            }
        },
        assignTabs(state, {title}) {
            let tabs = state.tabs;
            for (let item of tabs) {
                item['choose'] = false
                if ((item['title']) === title) item['choose'] = true
            }
            return {
                ...state,
                tabs: [...tabs]
            }
        },
        assignFilters(state, {key}) {
            let list = state.filters
            for (let item of list) {
                if (item['key'] === key) {
                    item['choose'] = !item['choose']
                } else {
                    if (item['key'] != 'auth') {
                        item['choose'] = false
                    }
                }
            }
            return {
                ...state,
                filters: [...list]
            }
        },
        showMoneySlide(state) {
            return {
                ...state,
                slideMoneyShow: !state.slideMoneyShow,
                slidePayTypeShow: false
            }
        },
        showPaySlide(state) {
            return {
                ...state,
                slidePayTypeShow: !state.slidePayTypeShow,
                slideMoneyShow: false
            }
        },
        hideSlide(state) {
            return {
                ...state,
                slideMoneyShow: false,
                slidePayTypeShow: false
            }
        },
        chooseMoneyType(state, {title}) {
            let list = state.money_list;
            for (let item of list) {
                item['choose'] = false;
                if (title === item['title']) item['choose'] = true
            }
            return {
                ...state,
                money_list: [...list]
            }
        },
        choosePayType(state, {title}) {
            let list = state.pay_list;
            for (let item of list) {
                item['choose'] = false;
                if (title === item['title']) item['choose'] = true
            }
            return {
                ...state,
                pay_list: [...list]
            }
        },
        assignList(state, {data, page}) {
            const list_name = state.tabs.filter(item => item.choose)[0]['name']
            let old_data = state[list_name].data;
            let list = state[list_name].list;
            let new_list = [];
            if (page === 1) {
                new_list = data
            } else {
                new_list = list.concat(data)
            }
            let nomore = false;
            if (data.length <= 30) {
                nomore = true;
            }
            state[list_name] = {
                ...state[list_name],
                data: old_data.cloneWithRows(new_list),
                list: new_list,
                page: page,
                nomore: nomore
            }
            return {
                ...state,
            }
        },
        refreshList(state,{data}){
            const list_name = state.tabs.filter(item => item.choose)[0]['name']
            let old_data = state[list_name].data;
            let list = state[list_name].list;
            let new_list = list;
            if(data.length == 0 || list.length == 0){
                return {
                    ...state
                }
            }
            if(list[0]['id'] != data[0]['id']){
                for(let i = data.length - 1; i >= 0; i--){
                    if(data[i] != list[0]['id']){
                        new_list.unshift(data[i])
                    }
                }
                state[list_name] = {
                    ...state[list_name],
                    data: old_data.cloneWithRows(new_list),
                    list: [...new_list],
                }
                state.test = 3
                return {
                    ...state,
                }
            }else{
                return {
                    ...state
                }
            }
        },
        cancelCallBack(state, {no}) {
            const table_name = state.tabs.filter(item => item.choose)[0]['name']
            const table = state[table_name]
            let new_list = table['list']
            let old_data = table['data']
            for (let item of new_list) {
                if (item['单号'] === no) {
                    item['订单状态'] = '撤销'
                }
            }
            state[table_name] = {
                ...state[table_name],
                list: [...new_list],
                data: old_data.cloneWithRows(new_list)
            }
            state.test = 2;
            return {
                ...state,
            }
        }
    },
    effects: {
        * refresh({page = 1}, {put, select, call}) {
            const tabs = yield select(state => state.OTCTradeList.tabs)
            const tab = tabs.filter(item => item.choose)[0]
            let get_data = [];
            if (tab.type === '交易') {
                const {data} = yield call(Services.myOrder, {page: page})
                get_data = data
            } else {
                const {data} = yield call(Services.getList, {type: tab.type, page: page})
                get_data = data
            }
            yield put({
                type: 'refreshList',
                data: get_data,
            })
        },
        * getList({page = 1}, {put, select, call}) {
            const tabs = yield select(state => state.OTCTradeList.tabs)
            const tab = tabs.filter(item => item.choose)[0]
            const list_name = tab.name
            const list = yield select(state => state.OTCTradeList[list_name])
            const nomore = list.nomore
            if (!nomore) {
                let get_data = [];
                if (tab.type === '交易') {
                    const {data} = yield call(Services.myOrder, {page: page})
                    get_data = data
                } else {
                    const {data} = yield call(Services.getList, {type: tab.type, page: page})
                    get_data = data
                }
                if(!get_data){
                    return;
                }
                yield put({
                    type: 'assignList',
                    data: get_data,
                    page: page
                })
            }
        },
        * loadMore({}, {put, select}) {
            const tabs = yield select(state => state.OTCTradeList.tabs)
            const tab = tabs.filter(item => item.choose)[0]
            const state = yield select(state => state.OTCTradeList)
            const page = state[tab['name']]['page']
            yield put({
                type: 'getList',
                page: page + 1
            })
        },
        * chooseFilter({key}, {put, select}) {
            // const list = yield select(state => state.OTCTradeList.filters)
            // const key = list.filter(item => item.choose)[0]['key']
            switch (key) {
                case 'auth':
                    yield put({
                        type: 'assignAuth'
                    })
                    yield put({
                        type: 'hideSlide'
                    })
                    break
                case 'money':
                    yield put({
                        type: 'showMoneySlide'
                    })
                    break
                case 'pay':
                    yield put({
                        type: 'showPaySlide'
                    })
                    break
            }
        },
        * cancel({no, callback}, {call, put}) {
            const {data} = yield call(Services.cancel, {no: no})
            if (data) {
                modalAlert(data, callback)
            }
        }
    }
}

function modalAlert(data, callBack) {
    Modal.alert('', data.信息, [
        {
            text: '我知道了', onPress: () => {
                if (data.状态) {
                    callBack && callBack()
                }
            }
        }
    ])
}
