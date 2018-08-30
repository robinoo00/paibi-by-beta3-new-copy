import {Modal,List,Flex} from 'antd-mobile'
import CSSModules from 'react-css-modules'
import styles from './inputPassword.less'
import React from 'react'
import {connect} from 'dva'

const keys = [
    {type:'key',style:'key',num:1,en:''},
    {type:'key',style:'key',num:2,en:'A B C'},
    {type:'key',style:'key',num:3,en:'D E F'},
    {type:'key',style:'key',num:4,en:'G H I'},
    {type:'key',style:'key',num:5,en:'J K L'},
    {type:'key',style:'key',num:6,en:'M N O'},
    {type:'key',style:'key',num:7,en:'P Q R S'},
    {type:'key',style:'key',num:8,en:'T U B'},
    {type:'key',style:'key',num:9,en:'W X Y Z'},
    {type:'empty',style:'empty',num:'',en:''},
    {type:'key',style:'key',num:0,en:''},
    {type:'reback',style:'reback',num:'',en:''},
]

class InputPassword extends React.Component{
    state = {
        password:[null,null,null,null,null,null],
        visible:false
    }
    constructor(props){
        super(props)
        this.state.visible = props.visible
    }
    componentWillReceiveProps(nextProps){
        if(this.state.visible != nextProps.visible){
            this.setState({
                visible: nextProps.visible,
                password:[null,null,null,null,null,null]
            })
        }
    }
    assignPassword = (num) => () =>{
        let pass = this.state.password
        for(let index in pass){
            if(!pass[index]){
                pass[parseInt(index)] = num;
                break;
            }
        }
        if(!this.checkFinish(pass)){
            this.setState({
                password:pass
            })
        }
    }
    checkFinish = (pass) => {
        const {finish} = this.props
        let pass_num = 0;
        let pass_value = '';
        for(let item of pass){
            if(item){
                pass_num ++
                pass_value += item
            }
        }
        if(pass_num === 6){
            finish(pass_value)
        }else{
            return false
        }
    }
    rebackPassword = () => {
        let pass = this.state.password
        for(let i = pass.length; i>=0; i--){
            if(pass[i]){
                pass[i] = null
                break
            }
        }
        this.setState({
            password:pass
        })
    }
    _hide = () => {
        this.props.hide()
    }
    render(){
        return (
            <Modal
                popup
                visible={this.state.visible}
                onClose={this._hide}
                animationType="slide-up"
            >
                <List
                    renderHeader={
                    <div>
                        <span styleName="close" onClick={this._hide}></span>
                        <span>请输入交易密码</span>
                    </div>
                    }
                >
                    <div style={{height:'10px'}}></div>
                    <Flex styleName='pass-container'>
                        {this.state.password.map((item,index) => (
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
                        {keys.map((item,index) => (
                            <Flex.Item onClick={item.type != 'reback' ? this.assignPassword(item.num) : this.rebackPassword} styleName={item.type} key={item.type+index}>
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

export default CSSModules(InputPassword,styles)
