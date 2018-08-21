import CSSModules from 'react-css-modules'
import styles from '../styles/filter.less'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'

const Filter = ({list,chooseFilter}) => (
    <Flex styleName={'container'}>
        {list.map(item => (
            <div
                key={item.key}
                styleName={'item-wrap'}
                onClick={chooseFilter(item.key)}
            >
                <div styleName={item.choose ? item.chooseStyle : item.style}>{item.title}</div>
            </div>
        ))}
    </Flex>
)

const mapStateToProps = state => ({
    list:state.OTCTradeList.filters
})

const mapDispatchToProps = dispatch => ({
    chooseFilter: key => () => {
        dispatch({
            type:'OTCTradeList/assignFilters',
            key:key
        })
        dispatch({
            type:'OTCTradeList/chooseFilter'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Filter, styles))
