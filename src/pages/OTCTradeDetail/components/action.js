import CSSModules from 'react-css-modules'
import styles from '../styles/action.less'
import {InputItem,Toast} from 'antd-mobile'
import Button from '../../../components/button/button'
import {connect} from 'dva'

const Action = ({...rest}) => (
    <div className="otc-trade-detail-action">
        <div styleName="container">
            <InputItem
                editable={false}
                defaultValue={rest.price}
            ><div styleName="price">价格<span styleName="unit">(CNY)</span></div></InputItem>
            <InputItem
                extra={<div style={{color:'#0099d9'}} onClick={rest.total}>全部</div>}
                placeholder={'请输入交易金额'}
                onChange={rest.change('money')}
                value={rest.money}
                type={'money'}
                moneyKeyboardAlign={'left'}
            >金额<span styleName="unit">(CNY)</span></InputItem>
            <InputItem
                extra={<div style={{color:'#0099d9'}}  onClick={rest.total}>全部</div>}
                placeholder={'请输入购买数量'}
                onChange={rest.change('num')}
                value={rest.num}
                type={'money'}
                moneyKeyboardAlign={'left'}
            >数量<span styleName="unit">(USDT)</span></InputItem>
        </div>
        <div styleName="submit">
            <Button
                title={rest.type === 1 ? '购买' : '出售'}
                disabled={false}
                callBack={rest.submit}
            />
        </div>
    </div>
)

const mapStateToProps = state => ({
    price:state.OTCTradeDetail.price,
    type:state.OTCTradeDetail.type,
    money:state.OTCTradeDetail.money,
    num:state.OTCTradeDetail.num,
})

const mapDispatchToProps = (dispatch,props) => ({
    total:() => {
        dispatch({
            type:'OTCTradeDetail/total',
        })
    },
    change:key => (val) => {
      dispatch({
          type:'OTCTradeDetail/assignValue',
          key:key,
          value:val
      })
    },
    submit:() => {
        dispatch({
            type:'OTCTradeDetail/submit',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Action, styles))
