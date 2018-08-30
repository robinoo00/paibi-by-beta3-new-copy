import config from "../utils/config";
import router from 'umi/router'
import {setTheme2} from "../utils/common";
import theme from '../utils/themes'

export default {
    namespace: 'god',
    state: {
        theme:1,
        headerColor:''
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                setTheme2(pathname)
                dispatch({
                    type:'assignTheme',
                    pathname:pathname
                })
                const key = localStorage.getItem(config.KEY);
                const cid = localStorage.getItem(config.CID);
                const {NoTokenPages} = config;
                if(!NoTokenPages.includes(pathname)){
                    // if(!key || !cid){
                    //     router.push('/login')
                    // }
                }
            })
        },
    },

    effects: {

    },

    reducers: {
        assignTheme(state,{pathname}){
            if(config.Theme2_comp.includes(pathname)){
                return {
                    ...state,
                    theme:2,
                    headerColor:theme.Theme2SectionColor
                }
            }else{
                return {
                    ...state,
                    theme:1,
                    headerColor:theme.Theme1SectionColor
                }
            }
        }
    },

};
