import {InputItem} from 'antd-mobile'
import {connect} from 'dva'

const AliAccount = ({...rest}) => (
    <div>
        <InputItem
            type={'password'}
            value={rest.old_pass}
            clear={true}
            onChange={rest.editOldPass}
            placeholder={'请输入原密码'}
        >
            原支付密码
        </InputItem>
        <InputItem
            type={'password'}
            value={rest.new_pass}
            clear={true}
            onChange={rest.editNewPass}
            placeholder={'请输入新密码'}
        >
            新支付密码
        </InputItem>
    </div>
)

const mapStateToProps = state => ({
    old_pass:state.OTCWalletEdit.aliAccount.old_pass,
    new_pass:state.OTCWalletEdit.aliAccount.new_pass
})

const mapDispatchToProps = dispatch => ({
    editOldPass:(val) => {
        dispatch({
            type:'OTCWalletEdit/editAccount',
            old_pass:val
        })
    },
    editNewPass:(val) => {
        dispatch({
            type:'OTCWalletEdit/editAccount',
            new_pass:val
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(AliAccount)
