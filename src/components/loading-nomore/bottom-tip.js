import {ActivityIndicator} from 'antd-mobile'
import styles from './style.less'
import {connect} from 'dva'

const BottomTip = ({nomore = false,theme}) => (
    <div>
        {!nomore ? <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                <ActivityIndicator color={theme === 1 ? "#fff" : "#000"} text="正在加载..." />
            </div> :
            <div className={styles.nomore} style={theme === 1 ? {color:'#fff'} : {color:'#000'}}>没有更多了</div>
        }
    </div>
)

const mapStateToProps = state => ({
    theme: state.god.theme
})

export default connect(mapStateToProps)(BottomTip)
