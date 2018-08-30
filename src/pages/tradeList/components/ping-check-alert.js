import CSSModules from 'react-css-modules'
import styles from '../styles/ping-check-alert.less'
import {Flex, Toast, Modal} from 'antd-mobile'
import {connect} from 'dva'
import React from 'react'

let shouldRender = true
let assignNum = false

class Item extends React.Component {
    state = {
        visible:false,
        num:1,
        item:{}
    }
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible != this.state.visible){
            shouldRender = true
            this.setState({
                visible: nextProps.visible,
                item: nextProps.item
            })
        }else{
            shouldRender = false
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(shouldRender || assignNum){
            return true
        }else{
            return false
        }
    }
    _hide = () => {
        const {hide} = this.props
        hide()
    }
    _submit = () => {
        const {submit} = this.props
        submit(this.state.num)
    }
    _handleNum = (num) => {
        let item = this.state.item
        if(num > 0 && num <= item.数量){
            assignNum = true
            this.setState({
                num:num
            },() => {
                assignNum = false
            })
        }
    }
    render() {
        const {item,num} = this.state
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    transparent
                    maskClosable={true}
                    onClose={this._hide}
                    title="确认平仓?"
                    footer={
                        [
                            {text: '取消', onPress: this._hide},
                            {
                                text: '确定', onPress: this._submit
                            },
                        ]
                    }
                    // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div>
                        <p style={{color: '#bcbcbc'}}> 合约号:{item.合约}</p>
                        <br/>
                        <Flex><Flex.Item styleName={'left'}>浮动盈亏:</Flex.Item>&nbsp;&nbsp;<Flex.Item
                            style={{color: '#E34C4D'}}>{item.浮动盈亏}</Flex.Item></Flex>
                        <Flex><Flex.Item styleName={'left'}>开仓价:</Flex.Item>&nbsp;&nbsp;<Flex.Item>{item.均价}</Flex.Item></Flex>
                        <Flex><Flex.Item styleName={'left'}>当前价:</Flex.Item>&nbsp;&nbsp;
                            <Flex.Item>{item.当前价}</Flex.Item></Flex>
                        <Flex><Flex.Item styleName={'left'}>持有数:</Flex.Item>&nbsp;&nbsp;
                            <Flex.Item>{item.数量}</Flex.Item></Flex>
                        <Flex styleName="num-choose">
                            <Flex.Item>
                                <div styleName="del-item" onClick={() => {this._handleNum(num - 1)}}>-
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div styleName="num-input">
                                    <input type="number" value={num} readOnly/>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div styleName="add-item" onClick={() => {this._handleNum(num + 1)}}>+
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default CSSModules(Item, styles)
