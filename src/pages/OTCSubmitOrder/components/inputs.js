import {List,InputItem,Toast,Modal,Flex} from 'antd-mobile'
import {connect} from 'dva'
import Button from '../../../components/button/button'
import {createForm} from 'rc-form'
import styles from '../styles/inputs.less'
import CSSModules from 'react-css-modules'
import React from 'react'

const OrderInputs = ({...rest}) => (
    <div>
        <List
            renderHeader={'价格'}
        >
            <InputItem
                placeholder={'请输入交易价格'}
                type={'digit'}
                {
                    ...rest.form.getFieldProps('price',{
                        rules: [{
                            required: true, message: '请输入交易价格',
                        }],
                    })
                }
            >
                交易价格
            </InputItem>
        </List>
        <List
            renderHeader={'交易数额'}
        >
            <InputItem
                placeholder={'请输入交易数量'}
                type={'digit'}
                {
                    ...rest.form.getFieldProps('number',{
                        rules: [{
                            required: true, message: '请输入交易数量',
                        }],
                    })
                }
            >
                数量<span styleName={'unit'}>(USDT)</span>
            </InputItem>
            <InputItem
                placeholder={'最小交易额2000'}
                // disabled={true}
                editable={false}
                {
                    ...rest.form.getFieldProps('money',{
                        initialValue:rest.form.getFieldValue('price') * rest.form.getFieldValue('number')
                            ? rest.form.getFieldValue('price') * rest.form.getFieldValue('number')
                            : ''
                    })
                }
            >
                金额<span styleName={'unit'}>(CNY)</span>
            </InputItem>
        </List>
        <List renderHeader={'对手限制'}>
            <Flex styleName={'input-wrap'}>
                <div styleName="label">单笔限额</div>
                <Flex styleName="value">
                    <InputItem {
                                   ...rest.form.getFieldProps('minimum',{
                                       rules: [{
                                           required: true, message: '请输入最小限额',
                                       }],
                                   })
                               } type="text" styleName="start" placeholder={'起订量'}/>
                    <span styleName="to">-</span>
                    <InputItem {
                                   ...rest.form.getFieldProps('maximum',{
                                   })
                               } type="text" styleName="end" placeholder={'最大量'}/>
                    <div styleName="lunit">USDT</div>
                </Flex>
            </Flex>
            <Flex styleName={'input-wrap'}>
                <div styleName="label">交易说明</div>
                <div styleName="value">
                    1.订单有效期15分钟，请及时付款并点击「我已支付」按钮。2.币由系统锁定托管，请安心下单
                </div>
            </Flex>
        </List>
        {/*<div style={{padding:'20px 15px',position:'fixed',bottom:0,width:'100%'}}>*/}
        <div style={{padding:'20px 15px'}}>
            <Button
                title={'发布交易单'}
                callBack={rest.submit(rest.rate,rest.type)}
            />
        </div>
    </div>
)

const mapStateToProps = state => ({
    rate:state.common.rate,
    type:state.OTCSubmitOrder.type
})

const mapDispatchToProps = (dispatch,props) => ({
    submit:(rate,type) => () => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                Modal.alert(`确认发布(${type})交易单`,
                    <div>
                        <p>下单价格: {value.price}</p>
                        <p>下单数量: {value.number}</p>
                        <p>指数价格: {rate}</p>
                    </div>,
                    [
                        {text:'取消',onPress:() => {}},
                        {text:'确定',onPress:() => {
                                dispatch({
                                    type: 'OTCSubmitOrder/submit',
                                    values:value
                                });
                            }}
                    ]
                )

            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(OrderInputs,styles)))
