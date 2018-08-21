import {InputItem,Toast} from 'antd-mobile'
import CSSModules from 'react-css-modules'
import styles from '../styles/inputs.less'
import Button from '../../../components/button/button'
import {connect} from 'dva'
import InputPassword from './inputPassword'
import {createForm} from 'rc-form'

const Inputs = ({...rest}) => (
    <div styleName="container">
        <InputItem
            value={'USDT'}
            // extra={<div styleName="arrow-right"></div>}
            editable={false}
        >
            当前币种
        </InputItem>
        <InputItem
            value={'USDT'}
            placeholder={'请输入划转数量'}
            {
                ...rest.form.getFieldProps('num',{
                    initialValue:rest.num,
                    rules: [{
                        required: true, message: '请输入划转数量',
                    }],
                })
            }
        >
            划转数量
        </InputItem>
        <div styleName="tip">
            <span styleName="tip-con">最多可转 0 USDT</span>
            <span styleName="all-btn">全部</span>
        </div>
        <div style={{padding:'15px'}}>
            <Button
                title={'确定划转'}
                callBack={rest.submit}
            />
        </div>
        <InputPassword/>
    </div>
)

const mapStateToProps = state => ({
    num:state.OTCCashConversion.num
})

const mapDispatchToProps = (dispatch,props) => ({
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                dispatch({
                    type:'OTCCashConversion/assignNum',
                    num:value['num']
                })
                dispatch({
                    type:'OTCCashConversion/togglePassword'
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });

    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Inputs,styles)))
