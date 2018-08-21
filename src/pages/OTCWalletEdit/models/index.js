import params from "../../../utils/params";
import * as Services from '../services/'
import {Toast, Modal} from 'antd-mobile'
import router from 'umi/router'

export default {
    namespace: 'OTCWalletEdit',
    state: {
        headerTitle: '',
        key: '',
        aliAccount: {
            account: '',
            nickname:'',
            old_pass:'',
            new_pass:'',
            qrcode_src: null,
            qrcode_file: null
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/OTCWalletEdit') {
                    dispatch({
                        type: 'assignKey',
                        key: query.key
                    })
                    dispatch({
                        type: 'assignData',
                        query: query
                    })
                }
            })
        }
    },
    reducers: {
        editAccount(state, {account = null, file = null,nickname = null,old_pass = null,new_pass = null}) {
            console.log(old_pass)
            console.log(new_pass)
            return {
                ...state,
                aliAccount: {
                    account: account ? account : state.aliAccount.account,
                    qrcode_src: file ? window.URL.createObjectURL(file) : state.aliAccount.qrcode_src,
                    qrcode_file: file ? file : state.aliAccount.qrcode_file,
                    nickname: nickname ? nickname : state.aliAccount.nickname,
                    old_pass: old_pass ? old_pass : state.aliAccount.old_pass,
                    new_pass: new_pass ? new_pass : state.aliAccount.new_pass
                }
            }
        },
        assignKey(state, {key}) {
            return {
                ...state,
                key: key
            }
        },
        assignData(state, {query}) {
            switch (query.key) {
                case params.EDIT_ALI_ACCOUNT:
                    state.headerTitle = '修改支付宝账号'
                    state.aliAccount.account = query.account
                    state.aliAccount.qrcode_src = query.src
                    break;
                case params.EDIT_ALI_NICKNAME:
                    state.headerTitle = '修改支付宝昵称'
                    state.aliAccount.nickname = query.nickname
                    break;
                case params.EDIT_ALI_PASSWORD:
                    state.headerTitle = '修改支付密码'
                    break;
            }
            return {
                ...state
            }
        }
    },
    effects: {
        * submit({}, {select, put}) {
            const key = yield select(state => state.OTCWalletEdit.key)
            let type = '';
            switch (key) {
                case params.EDIT_ALI_ACCOUNT:
                    type = 'editAliAccount'
                    break
                case params.EDIT_ALI_NICKNAME:
                    type = 'editAliNickName'
                    break
                case params.EDIT_ALI_PASSWORD:
                    type = 'editAliPassword'
                    break
            }
            yield put({
                type: type
            })
        },
        * editAliAccount({}, {call, select}) {
            const qrcode_file = yield select(state => state.OTCWalletEdit.aliAccount.qrcode_file)
            if (!qrcode_file) {
                Toast.info('请上传收款二维码')
                return
            }
            const account = yield select(state => state.OTCWalletEdit.aliAccount.account)
            let formData = new FormData()
            formData.append('alipay', account)
            formData.append('codepic', qrcode_file)
            const {data} = yield call(Services.editAliAccount, formData)
            result(data)
        },
        * editAliNickName({},{call, select}){
            const nickname = yield select(state => state.OTCWalletEdit.aliAccount.nickname)
            const {data} = yield call(Services.editAliNickName,{nickname:nickname})
            result(data)
        },
        * editAliPassword({},{call, select}){
            const old_pass = yield select(state => state.OTCWalletEdit.aliAccount.old_pass)
            const new_pass = yield select(state => state.OTCWalletEdit.aliAccount.new_pass)
            const {data} = yield call(Services.editAliPassword,{oldpass:old_pass,pass:new_pass})
            result(data)
        }
    }
}

function result(data){
    if (data) {
        Modal.alert('提示', data.信息, [
            {
                text: '我知道了', onPress: () => {
                    if(data.状态){
                        router.push('personal')
                    }
                }
            }
        ])
    }
}
