import Header from '../../../components/header2/header'
import Tabs from './tabs'
import router from 'umi/router'

const Index = () => (
    <div className={'list'}>
        <Header
            title={'全部订单'}
            leftCallBack = {() => {router.push('OTCTradeList')}}
        />
        <Tabs/>
    </div>
)

export default Index
