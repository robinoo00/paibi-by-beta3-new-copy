import {InputItem} from 'antd-mobile'
import {connect} from 'dva'

const AliAccount = ({...rest}) => (
    <div>
        <InputItem
            value={rest.value}
            clear={true}
            onChange={rest.editNickName}
        >
            支付宝账号
        </InputItem>
    </div>
)

const mapStateToProps = state => ({
    value:state.OTCWalletEdit.aliAccount.nickname,
})

const mapDispatchToProps = dispatch => ({
    editNickName:(val) => {
        dispatch({
            type:'OTCWalletEdit/editAccount',
            nickname:val
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(AliAccount)
