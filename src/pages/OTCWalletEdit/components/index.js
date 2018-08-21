import Header from './header'
import {connect} from 'dva'
import params from "../../../utils/params";
import AliAccount from './aliAccount'
import AliNickname from './aliNickname'
import AliPassword from './aliPassword'
import Button from '../../../components/button/button'

const Index = ({keyName,submit}) => (
    <div>
        <Header/>
        <div style={{height:'15px'}}></div>
        {keyName === params.EDIT_ALI_ACCOUNT ? <AliAccount/> : null}
        {keyName === params.EDIT_ALI_NICKNAME ? <AliNickname/> : null}
        {keyName === params.EDIT_ALI_PASSWORD ? <AliPassword/> : null}
        <div style={{padding:'20px 15px'}}>
            <Button
                title={'保存'}
                callBack={submit}
            />
        </div>
    </div>
)

const mapStateToProps = state => ({
    keyName:state.OTCWalletEdit.key,
})

const mapDispatchToProps = dispatch => ({
    submit:() => {
        dispatch({
            type:'OTCWalletEdit/submit',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)

