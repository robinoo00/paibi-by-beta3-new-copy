import config from "../utils/config";
import router from 'umi/router'
import {setTheme2} from "../utils/common";
import theme from '../utils/themes'

export default {
    namespace: 'common',
    state: {
        showInputPassword:false
    },
    subscriptions: {
    },

    effects: {

    },

    reducers: {
        showInputPassword(state){
            return {
                ...state,
                showInputPassword: true
            }
        },
        hideInputPassword(state){
            return {
                ...state,
                showInputPassword: false
            }
        }
    },

};
