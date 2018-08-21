import {InputItem} from 'antd-mobile'
import {connect} from 'dva'
import Qrcode from '../../OTCWalletSetting/components/qrcode'

const AliAccount = ({...rest}) => (
    <div>
        <InputItem
            value={rest.value}
            clear={true}
            onChange={rest.editAccount}
        >
            支付宝账号
        </InputItem>
        <div style={{marginTop:'20px'}}>
            <Qrcode
                src={rest.src}
                upload={rest.upload}
            />
        </div>
    </div>
)

const mapStateToProps = state => ({
    value:state.OTCWalletEdit.aliAccount.account,
    src:state.OTCWalletEdit.aliAccount.qrcode_src,
})

const mapDispatchToProps = dispatch => ({
    editAccount:(val) => {
        dispatch({
            type:'OTCWalletEdit/editAccount',
            account:val
        })
    },
    upload: (e) => {
        const file = e.target.files[0];
        dispatch({
            type:'OTCWalletEdit/editAccount',
            file:file
        })
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(AliAccount)
