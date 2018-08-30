import * as Services from '../services/'
import {Modal} from 'antd-mobile'

export default {
    namespace:'OTCCashConversion',
    state:{
        switch_type:1,//1币转余额 2余额转币
        num:0,
        password_show:false,
    },
    subscriptions:{},
    reducers:{
        assignNum(state,{num}){
            return {
                ...state,
                num:num
            }
        },
        assignSwitchType(state){
          return {
              ...state,
              switch_type:state.switch_type === 1 ? 2 : 1
          }
        },
        togglePassword(state){
            return{
                ...state,
                password_show:!state.password_show,
            }
        }
    },
    effects:{
        *submit({pass},{select,call,put}){
            yield put({
                type:'togglePassword'
            })
            const switch_type = yield select(state => state.OTCCashConversion.switch_type)
            const num = yield select(state => state.OTCCashConversion.num)
            let res = null;
            const pass_data = {
                pass:pass,
                number:num
            }
            // Modal.alert('','好像成功了',[
            //     {text:'我知道了',onPress:() => {}}
            // ])
            // return;
            if(switch_type === 1){
                const {data} = yield call(Services.inCash,pass_data)
                res = data
            }
            if(switch_type === 2){
                const {data} = yield call(Services.outCash,pass_data)
                res = data
            }
            if(res){
                Modal.alert('',res.信息,[
                    {text:'我知道了',onPress:() => {}}
                ])
            }
        }
    }
}
