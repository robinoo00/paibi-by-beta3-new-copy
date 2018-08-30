import {InputItem} from 'antd-mobile'
import {connect} from 'dva'
import InputPassword from '../../../components/inputPassword'

let edit_witch = null

const AliAccount = ({...rest}) => (
    <div>
        <InputItem
            type={'password'}
            value={rest.old_pass}
            // clear={true}
            // onChange={rest.editOldPass}
            placeholder={'请输入原密码'}
            onClick={rest.showInputPassword(1)}
        >
            原支付密码
        </InputItem>
        <InputItem
            type={'password'}
            value={rest.new_pass}
            // clear={true}
            // onChange={rest.editNewPass}
            placeholder={'请输入新密码'}
            onClick={rest.showInputPassword(2)}
        >
            新支付密码
        </InputItem>
        <InputPassword
            visible={rest.visible}
            hide={rest.hideInputPassword}
            finish={(val) => {rest.edit(val)}}
        />
    </div>
)

const mapStateToProps = state => ({
    old_pass:state.OTCWalletEdit.aliAccount.old_pass,
    new_pass:state.OTCWalletEdit.aliAccount.new_pass,
    visible:state.common.showInputPassword
})

const mapDispatchToProps = dispatch => ({
    showInputPassword:(index) => () => {
        edit_witch = index
        dispatch({
            type:'common/showInputPassword',
        })
    },
    hideInputPassword:() => {
        dispatch({
            type:'common/hideInputPassword',
        })
    },
    edit:(val) => {
        dispatch({
            type:'common/hideInputPassword',
        })
        if(edit_witch === 1){
            dispatch({
                type:'OTCWalletEdit/editAccount',
                old_pass:val
            })
        }
        if(edit_witch ===2){
            dispatch({
                type:'OTCWalletEdit/editAccount',
                new_pass:val
            })
        }
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(AliAccount)
