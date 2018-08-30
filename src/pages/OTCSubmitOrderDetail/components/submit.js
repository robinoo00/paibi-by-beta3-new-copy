import {connect} from 'dva'
import Button from '../../../components/button/button'
import {Modal} from 'antd-mobile'
import Alert from './alert'
import InputPassword from '../../../components/inputPassword/'

const Submit = ({...rest}) => (
    <div style={{padding: '15px'}}>
        {rest.data.类型 === '出售' && rest.data.接单状态 === '已接单已付款' ? <Button
            title={'已付款，催单'}
            callBack={rest.shipments}
        /> : null}
        {rest.data.类型 === '出售' && rest.data.接单状态 === '已接单未付款' ? <Button
            title={'确定，已付款'}
            callBack={rest.pay}
        /> : null}
        {rest.data.类型 === '购买' && rest.data.接单状态 === '已接单已付款' ? <Button
            title={'同意平台转币'}
            callBack={rest.agree}
        /> : null}
        {rest.data.类型 === '购买' && rest.data.接单状态 === '已接单未付款' ? <Button
            title={'催款'}
            callBack={rest.urge}
        /> : null}
        <InputPassword
            visible={rest.visible}
            hide={rest.hide}
            finish={(value) => {rest.finish(value)}}
        />
    </div>
)

const mapStateToProps = state => ({
    visible:state.OTCSubmitOrderDetail.inputPassword_show,
    data:state.OTCSubmitOrderDetail.data,
})

const mapDispatchToProps = dispatch => ({
    hide:() => {
        dispatch({
            type:'OTCSubmitOrderDetail/toggleInputPassowrd'
        })
    },
    finish:(pass) => {
        dispatch({
            type:'OTCSubmitOrderDetail/toggleInputPassowrd'
        })
        dispatch({
            type:'OTCSubmitOrderDetail/agree',
            pass:pass
        })
        dispatch({
            type:'OTCSubmitOrderDetail/getDetail'
        })
    },
    shipments:() => {
        Modal.alert('是否催促对方', '', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '同意', onPress: () => {
                    dispatch({
                        type:'OTCSubmitOrderDetail/shipments'
                    })
                }
            }
        ])
    },
    agree: () => {
        dispatch({
            type:'OTCSubmitOrderDetail/toggleInputPassowrd'
        })
    },
    pay: () => {
        Modal.alert('确认完成线下支付', '', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '已支付', onPress: () => {
                    dispatch({
                        type:'OTCSubmitOrderDetail/pay'
                    })
                    dispatch({
                        type:'OTCSubmitOrderDetail/getDetail'
                    })
                }
            }
        ])
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
