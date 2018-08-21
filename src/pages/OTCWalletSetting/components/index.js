import Header from './header'
import {connect} from 'dva'
import config from "../../../utils/config";
import Alipay from './alipay'
import React from 'react'

const Index = ({keyName}) => (
    <div>
        <Header/>
        {keyName === config.ALIPAY ? <Alipay/> : null}
    </div>
)

const mapStateToProps = state => ({
    keyName:state.OTCWalletSetting.key
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)
