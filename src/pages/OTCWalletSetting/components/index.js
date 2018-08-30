import Header from './header'
import {connect} from 'dva'
import params from "../../../utils/params";
import Alipay from './alipay'
import React from 'react'

const Index = ({keyName}) => (
    <div>
        <Header/>
        {keyName === params.EDIT_ALIPay ? <Alipay/> : null}
    </div>
)

const mapStateToProps = state => ({
    keyName:state.OTCWalletSetting.key
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)
