import CSSModules from 'react-css-modules'
import styles from '../styles/action.less'
import {InputItem,Toast} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'
import {connect} from 'dva'

const Action = ({form,submit}) => (
    <div>
        <div styleName="container">
            <InputItem
                editable={false}
                {...form.getFieldProps('price', {
                    initialValue:123
                })}
            >价格(CNY)</InputItem>
            <InputItem
                extra={<div style={{color:'#0099d9'}}>全部</div>}
                placeholder={'交易限额50,000-90,000'}
                {...form.getFieldProps('money', {
                    rules: [{
                        required: true, message: '请输入金额',
                    }],
                })}
            >金额(CNY)</InputItem>
            <InputItem
                extra={<div style={{color:'#0099d9'}}>全部</div>}
                placeholder={'请输入购买数量'}
                {...form.getFieldProps('num', {
                    rules: [{
                        required: true, message: '请输入数量',
                    }],
                })}
            >数量(CNY)</InputItem>
        </div>
        <div styleName="submit">
            <Button
                title={'购买'}
                disabled={false}
                callBack={submit}
            />
        </div>
    </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch,props) => ({
    submit:() => {
        console.log(123)
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
