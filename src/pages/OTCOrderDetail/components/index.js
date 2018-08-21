import Header from '../../../components/header2/header'
import theme from '../../../utils/themes'
import Info from './info'
import Action from './action'
import Time from './time'
import Submit from './submit'

const Index = () => (
    <div>
        <Header
            title={'订单详情'}
            rightText={<div style={{color:theme.Theme2BlueColor}}>帮助</div>}
        />
        <Info/>
        <Action/>
        <Time/>
        <Submit/>
    </div>
)

export default Index
