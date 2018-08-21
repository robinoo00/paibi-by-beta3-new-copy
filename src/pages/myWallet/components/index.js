import Header from '../../../components/header2/header'
import Info from './info'
import Setting from './setting'
import List from './list'

const Index = () => (
    <div>
        <Header
            title={'我的钱包'}
        />
        <Info/>
        <Setting/>
        <List/>
    </div>
)

export default Index
