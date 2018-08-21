import {connect} from 'dva'
import Button from '../../../components/button/button'
import {Modal} from 'antd-mobile'
import Alert from './alert'

const Submit = ({submit}) => (
    <div style={{padding:'15px'}}>
        <Button
            title={'确认，并支付'}
            callBack={submit}
        />
    </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    submit:() => {
        Modal.alert('确认完成线下支付',<Alert/>,[
            {text:'取消',onPress:() => {}},
            {text:'已支付',onPress:() => {}}
        ])
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Submit)
