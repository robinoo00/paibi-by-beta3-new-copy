import {List} from 'antd-mobile'
import styles from '../styles/list.less'
import CSSModules from 'react-css-modules'
import {connect} from 'dva'
import router from 'umi/router'

const SettingList = ({list}) => (
    <List style={{marginTop:'15px'}}>
        {list.map(item => (
            <List.Item
                key={item.key}
                extra={item.extra}
                arrow={'horizontal'}
                onClick={()=>{router.push({pathname:'OTCWalletSetting',query:{key:item.key}})}}
            >
                <div styleName={item.setting ? item.styleChecked : item.style}>{item.title}</div>
            </List.Item>
        ))}
    </List>
)

const mapStateToProps = state => ({
    list:state.OTCWalletSettings.list
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(SettingList,styles))
