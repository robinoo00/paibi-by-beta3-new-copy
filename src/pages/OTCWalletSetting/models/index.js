import config from "../../../utils/config";
import params from "../../../utils/params";
import * as Services from '../services/'
import {Toast, Modal} from 'antd-mobile'
import router from 'umi/router'
import * as PersonalServices from "../../personal/services/personal";

export default {
    namespace: 'OTCWalletSetting',
    state: {
        key: '',//alipay:支付宝
        headerTitle: '',
        alipay: [
            {title: '支付宝账号', placeholder: '请输入支付宝账号', name: 'alipay', value: '',type:'text',key:params.EDIT_ALI_ACCOUNT},
            {title: '交易昵称', placeholder: '请输入交易昵称', name: 'nickname', value: '',type:'text',key:params.EDIT_ALI_NICKNAME},
            {title: '支付密码', placeholder: '请输入支付密码', name: 'pass', value: '',type:'password',key:params.EDIT_ALI_PASSWORD},
        ],
        qrcode_file: null,
        qrcode_src: null,
        setting:false
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/OTCWalletSetting') {
                    dispatch({
                        type: 'assignQrcode',
                        file: null
                    })
                    dispatch({
                        type: 'getInfo'
                    })
                    dispatch({
                        type: 'assignKey',
                        key: query.key
                    })
                    dispatch({
                        type: 'assignHeaderTitle',
                        key: query.key
                    })
                }
            })
        }
    },
    reducers: {
        assignData(state, {data}) {
            console.log(data);
            state.alipay[0]['value'] = data.支付宝账号
            state.alipay[1]['value'] = data.昵称
            state.alipay[2]['value'] = '******'
            state.qrcode_src = config.server + 'getuserpic2?url='+data.支付宝二维码
            state.setting = true
            return {
                ...state
            }
        },
        assignQrcode(state, {file}) {
            if (file) {
                return {
                    ...state,
                    qrcode_file: file,
                    qrcode_src: window.URL.createObjectURL(file)
                }
            } else {
                return {
                    ...state,
                    qrcode: null,
                    qrcode_src: null
                }
            }
        },
        assignKey(state, {key}) {
            return {
                ...state,
                key: key
            }
        },
        assignHeaderTitle(state, {key}) {
            let title = '';
            switch (key) {
                case config.ALIPAY:
                    title = '设置支付宝'
                    break
            }
            return {
                ...state,
                headerTitle: title
            }
        }
    },
    effects: {
        * getInfo({}, {call, select, put}) {
            const info = yield select(state => state.personal.info);
            let set_data = info;
            if (set_data.empty) {
                const {data} = yield call(PersonalServices.getUserInfo, {});
                set_data = data;
            }
            if(set_data.支付宝账号){
                yield put({
                    type:'assignData',
                    data:set_data
                })
            }
        },
        * submit({value}, {call, select}) {
            let formData = new FormData();
            const keys = Object.keys(value)
            keys.map(key => {
                formData.append(key, value[key])
            })
            const file = yield select(state => state.OTCWalletSetting.qrcode);
            if (!file) {
                Toast.info('请上传收款码')
                return;
            }
            formData.append('codepic', file);
            const {data} = yield call(Services.setAliPay, formData)
            if (data) {
                if (data.状态) {
                    Modal.alert('提示', data.信息, [
                        {
                            text: '我知道了', onPress: () => {
                                router.push('personal')
                            }
                        }
                    ])
                } else {
                    Toast.info(data.信息)
                }
            }
        }
    }
}
