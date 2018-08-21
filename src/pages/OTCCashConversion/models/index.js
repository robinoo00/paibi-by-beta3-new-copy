import * as Services from '../services/'
import {Modal} from 'antd-mobile'

export default {
    namespace:'OTCCashConversion',
    state:{
        switch_type:1,//1币转余额 2余额转币
        num:0,
        password_show:false,
        password:[null,null,null,null,null,null],
        keys:[
            {type:'key',style:'key',num:1,en:''},
            {type:'key',style:'key',num:2,en:'A B C'},
            {type:'key',style:'key',num:3,en:'D E F'},
            {type:'key',style:'key',num:4,en:'G H I'},
            {type:'key',style:'key',num:5,en:'J K L'},
            {type:'key',style:'key',num:6,en:'M N O'},
            {type:'key',style:'key',num:7,en:'P Q R S'},
            {type:'key',style:'key',num:8,en:'T U B'},
            {type:'key',style:'key',num:9,en:'W X Y Z'},
            {type:'empty',style:'empty',num:'',en:''},
            {type:'key',style:'key',num:0,en:''},
            {type:'reback',style:'reback',num:'',en:''},
        ]
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
            let pass = state.password
            if(state.password_show){
                pass = [null,null,null,null,null,null]
            }
            return{
                ...state,
                password_show:!state.password_show,
                password:[...pass]
            }
        },
        assignPassword(state,{num}){
            let pass = state.password
            for(let index in pass){
                if(!pass[index]){
                    pass[parseInt(index)] = num;
                    break;
                }
            }
            return{
                ...state,
                password:[...pass]
            }
        },
        rebackPassword(state){
            let pass = state.password
            for(let i = pass.length; i>=0; i--){
                if(pass[i]){
                    pass[i] = null
                    break
                }
            }
            return{
                ...state,
                password:[...pass]
            }
        }
    },
    effects:{
        *checkPassLength({num},{select,call,put}){
            yield put({
                type:'assignPassword',
                num
            })
            const pass = yield select(state => state.OTCCashConversion.password)
            let pass_num = 0;
            let pass_value = '';
            for(let item of pass){
                if(item){
                    pass_num ++
                    pass_value += item
                }
            }
            if(pass_num === 6){
                yield put({
                    type:'togglePassword'
                })
                const switch_type = yield select(state => state.OTCCashConversion.switch_type)
                const num = yield select(state => state.OTCCashConversion.num)
                let res = null;
                const pass_data = {
                    pass:pass_value,
                    number:num
                }
                Modal.alert('','好像成功了',[
                    {text:'我知道了',onPress:() => {}}
                ])
                return;
                if(switch_type === 1){
                    const {data} = yield call(Services.inCash,pass_data)
                    res = data
                }
                if(switch_type === 2){
                    const {data} = yield call(Services.outCash,pass_data)
                    res = data
                }
                console.log(res)
            }
        }
    }
}
