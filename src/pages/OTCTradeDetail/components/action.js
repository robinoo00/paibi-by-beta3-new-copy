import CSSModules from 'react-css-modules'
import styles from '../styles/action.less'
import {InputItem,Toast} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'
import {connect} from 'dva'

const Action = ({form,submit,type}) => (
    <div className="otc-trade-detail-action">
        <div styleName="container">
            <InputItem
                editable={false}
                {...form.getFieldProps('price', {
                    initialValue:123
                })}
            ><div styleName="price">价格<span styleName="unit">(CNY)</span></div></InputItem>
            <InputItem
                extra={<div style={{color:'#0099d9'}}>全部</div>}
                placeholder={'交易限额50,000-90,000'}
                {...form.getFieldProps('money', {
                    rules: [{
                        required: true, message: '请输入金额',
                    }],
                })}
            >金额<span styleName="unit">(CNY)</span></InputItem>
            <InputItem
                extra={<div style={{color:'#0099d9'}}>全部</div>}
                placeholder={'请输入购买数量'}
                {...form.getFieldProps('num', {
                    rules: [{
                        required: true, message: '请输入数量',
                    }],
                })}
            >数量<span styleName="unit">(USDT)</span></InputItem>
        </div>
        <div styleName="submit">
            <Button
                title={type === 1 ? '购买' : '出售'}
                disabled={false}
                callBack={submit}
            />
        </div>
    </div>
)

const mapStateToProps = state => ({
    type:state.OTCTradeDetail.type
})

const mapDispatchToProps = (dispatch,props) => ({
    submit:() => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Action, styles)))
