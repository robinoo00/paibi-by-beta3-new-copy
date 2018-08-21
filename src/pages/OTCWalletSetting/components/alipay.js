import CSSModules from 'react-css-modules'
import styles from '../styles/alipay.less'
import {List,InputItem,Toast} from 'antd-mobile'
import {createForm} from 'rc-form'
import {connect} from 'dva'
import Button from '../../../components/button/button'
import Qrcode from './qrcode'
import params from "../../../utils/params";
import router from 'umi/router'

const AlipaySetting = ({form,list,upload,submit,src,setting,edit}) => (
    <div>
        <List style={{marginTop:'15px'}}>
            {list.map(item => (
                <InputItem
                    editable={!setting}
                    type={item.type}
                    key={item.name}
                    placeholder={item.placeholder}
                    extra={setting ? <div onClick={edit(item,src)} style={{color:'#0099d9'}}>修改</div> : ''}
                    {
                        ...form.getFieldProps(item.name,{
                            initialValue:item.value,
                            rule:[{
                                required:true,message:item.placeholder
                            }]
                        })
                    }
                >{item.title}</InputItem>
            ))}
        </List>
        <div styleName="qrcode-wrap">
            <div styleName="header">支付宝收款码</div>
            <div styleName="qrcode">
                <Qrcode
                    src={src}
                    upload={upload}
                />
            </div>
        </div>
        {setting
            ?
                null
            :
                <div style={{margin:'20px 15px'}}>
                    <Button
                        title={'保存'}
                        callBack={submit}
                    />
                </div>
        }
    </div>
)

const mapStateToProps = state => ({
    list:state.OTCWalletSetting.alipay,
    src:state.OTCWalletSetting.qrcode_src,
    setting:state.OTCWalletSetting.setting
})

const mapDispatchToProps = (dispatch,props) => ({
    edit:(item,src) =>() => {
        const pathname = 'OTCWalletEdit';
        let query = {key:item.key}
        switch (item.key){
            case params.EDIT_ALI_ACCOUNT:
                query.account = item.value
                query.src = src
                break
            case params.EDIT_ALI_NICKNAME:
                query.nickname = item.value
                break
        }
        router.push({pathname:pathname,query:query})
    },
    upload: (e) => {
        const file = e.target.files[0];
        dispatch({
            type:'OTCWalletSetting/assignQrcode',
            file:file
        })
    },
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                console.log(value)
                dispatch({
                    type:'OTCWalletSetting/submit',
                    value:value
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(AlipaySetting,styles)))
