import {Picker} from 'antd-mobile'
import Header from '../../../components/header2/header'
import CSSModules from 'react-css-modules'
import styles from '../styles/header.less'
import BBox from './bBox'
import React from 'react'

class ListHeader extends React.Component {
    state = {
        show: false
    }
    showBox = () => {
        this.setState({
            show: true
        })
    }
    hideBox = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div>
                <Header
                    back={false}
                    leftText={'CNY'}
                    rightText={'￥6.82'}
                    title={<div styleName="header-title">USDT/CNY</div>}
                    callBack={this.showBox}
                />
                {this.state.show
                    ? <BBox
                        hide={this.hideBox}
                    />
                    : null}
            </div>
        )
    }
}

export default CSSModules(ListHeader, styles)
