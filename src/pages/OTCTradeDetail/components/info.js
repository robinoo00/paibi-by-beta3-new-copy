import CSSModules from 'react-css-modules'
import styles from '../styles/info.less'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'
import {FormatAfterDotNumber} from '../../../utils/common'

const Info = ({data}) => (
    <div styleName="container">
        <Flex styleName="name-pay">
            <div styleName="name">{data.昵称}</div>
            <Flex styleName="pay-type">
                <div styleName="alipay"></div>
                {/*<div styleName="yhpay"></div>*/}
            </Flex>
        </Flex>
        <Flex styleName="trade-detail">
            <Flex>
                <div styleName="num">{FormatAfterDotNumber(data.成交率 * 100,2)}%</div>
                <div styleName="title">成交率</div>
            </Flex>
            <Flex>
                <div styleName="num">{data.交易单}</div>
                <div styleName="title">交易单</div>
            </Flex>
            {/*<Flex>*/}
                {/*<div styleName="num">1,369</div>*/}
                {/*<div styleName="title">放币时效</div>*/}
            {/*</Flex>*/}
        </Flex>
    </div>
)

const mapStateToProps = state => ({
    data:state.OTCTradeDetail.data
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Info,styles))
