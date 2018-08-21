import {Modal,List,Flex} from 'antd-mobile'
import CSSModules from 'react-css-modules'
import styles from '../styles/inputPassword.less'
import React from 'react'
import {connect} from 'dva'

class InputPassword extends React.Component{
    test = () => {
        console.log('test')
    }
    render(){
        const {...rest} = this.props;
        return (
            <Modal
                popup
                visible={rest.visible}
                onClose={rest.hide}
                animationType="slide-up"
            >
                <List
                    renderHeader={
                    <div>
                        <span styleName="close" onClick={rest.hide}></span>
                        <span>请输入交易密码</span>
                    </div>
                    }
                >
                    <div style={{height:'10px'}}></div>
                    <Flex styleName='pass-container'>
                        {rest.password.map((item,index) => (
                            <Flex.Item key={'pass'+index} styleName="pass-item">
                                {item
                                ?
                                    <div styleName="inputed"></div>
                                :
                                    null
                                }
                            </Flex.Item>
                        ))}
                    </Flex>
                    <div styleName="forget">忘记密码？</div>
                    <Flex styleName='keyboard' wrap={'wrap'}>
                        {rest.keys.map((item,index) => (
                            <Flex.Item onClick={item.type != 'reback' ? rest.assignPassword(item.num) : rest.rebackPassword} styleName={item.type} key={item.type+index}>
                                {item.num != 0
                                    ?
                                    <div styleName="num">{item.num}</div>
                                    :
                                    <div styleName="num-zero">{item.num}</div>
                                }
                                {item.num != 0
                                    ?
                                    <p styleName="en">{item.en}</p>
                                    : null}
                            </Flex.Item>
                        ))}
                    </Flex>
                </List>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    visible:state.OTCCashConversion.password_show,
    password:state.OTCCashConversion.password,
    keys:state.OTCCashConversion.keys,
})

const mapDispatchToProps = dispatch => ({
    hide:() => {
        dispatch({
            type:'OTCCashConversion/togglePassword'
        })
    },
    assignPassword:num => () => {
        if(num){
            dispatch({
                type:'OTCCashConversion/checkPassLength',
                num:num
            })
        }
    },
    rebackPassword:() => {
        dispatch({
            type:'OTCCashConversion/rebackPassword'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(InputPassword,styles))
