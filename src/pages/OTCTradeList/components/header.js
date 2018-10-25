import {Picker} from 'antd-mobile'
import Header from '../../../components/header2/header'
import CSSModules from 'react-css-modules'
import styles from '../styles/header.less'
import BBox from './bBox'
import React from 'react'
import {connect} from 'dva'

let id = 0

class ListHeader extends React.Component {
    state = {
        show: false
    }
    componentDidMount(){
        const {getRate} = this.props;
        getRate()
        id = setInterval(() => {
            getRate()
        },3000)
    }
    componentWillUnmount(){
        clearInterval(id)
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
        const {...rest} = this.props
        return (
            <div>
                <Header
                    back={false}
                    leftText={'CNY'}
                    rightText={rest.rate}
                    // title={<div styleName="header-title">USDT/CNY</div>}
                    title={<div>USDT/CNY</div>}
                    // callBack={this.showBox}
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

const mapStateToProps = state => ({
    rate:state.common.rate
})

const mapDispatchToProps = dispatch => ({
    getRate:() => {
        dispatch({
            type:'common/getRate'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(ListHeader, styles))
