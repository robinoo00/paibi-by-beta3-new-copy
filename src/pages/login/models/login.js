import * as LoginServices from '../services/login'
import {Toast,Modal} from 'antd-mobile'
import router from 'umi/router'
import config from '../../../utils/config'

export default {
    namespace: 'login',
    autologin:false,
    state: {
        pickerData:[
            {label:'实盘',value:0,choose:true},
            // {label:'模拟',value:1,choose:true}
        ],
        pwd_cash:localStorage.getItem(config.PWD_CASH) === "false" ? false : true,
        account:localStorage.getItem(config.ACCOUNT) === null ? '' : localStorage.getItem(config.ACCOUNT),
        password:localStorage.getItem(config.PASSWORD) === null ? '' : localStorage.getItem(config.PASSWORD)
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/login'){
                    window.hideAll();
                    // console.log(localStorage.getItem(config.ACCOUNT));
                }
            })
        },
    },

    effects: {
        *LoginIn({values},{call,select}){
            Toast.loading('登录中...',0);
            const {data} = yield call(LoginServices.Login,values);
            const pwd_cash = yield select(state => state.login.pwd_cash);
            localStorage.setItem(config.PWD_CASH,pwd_cash);
            if(typeof data != 'undefined'){
                Toast.hide();
                if(data == ''){
                    Toast.info('登录失败',1);
                    return;
                }
                if(data.状态){
                    Toast.info('登录成功',1);
                    localStorage.setItem(config.KEY,data.key);
                    localStorage.setItem(config.CID,data.cid);
                    sessionStorage.setItem(config.PASSWORD,values.password);
                    if(pwd_cash){
                        localStorage.setItem(config.PASSWORD,values.password);
                        localStorage.setItem(config.ACCOUNT,values.account);
                    }else{
                        localStorage.removeItem(config.ACCOUNT);
                        localStorage.removeItem(config.PASSWORD);
                    }
                    router.push('/personal');
                }else{
                    Toast.info(data.信息,1);
                }
            }
        },
        *autoLogin({},{call,put}){
            yield put({
                type:'assignAutoLogin',
                bool:true
            })
            const key = localStorage.getItem(config.KEY);
            // localStorage.removeItem(config.KEY);
            const {data} = yield call(LoginServices.getKey,{key:key});
            if(data){
                if(data.状态){
                    localStorage.setItem(config.KEY,data.key);
                }
                yield put({
                    type:'assignAutoLogin',
                    bool:false
                })
            }
        },
        *loginOut({},{}){
            Modal.alert('退出登录', '确定退出吗?', [
                {
                    text: '取消', onPress: () => {
                    }
                },
                {
                    text: '确定', onPress: () => {
                        // localStorage.removeItem(config.CID);
                        localStorage.removeItem(config.KEY);
                        router.push('login')
                    }
                }
            ])
        }
    },

    reducers: {
        assignAutoLogin(state,{bool}){
          return {
              ...state,
              autologin:bool
          }
        },
        assignPwdCash(state){
            return {
                ...state,
                pwd_cash:!state.pwd_cash
            }
        }
    },

};
