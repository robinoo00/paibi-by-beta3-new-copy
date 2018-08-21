import CSSModules from 'react-css-modules'
import styles from '../styles/qrcode.less'

const Qrcode = ({upload,src}) => (
    <div styleName="container" style={src ? {border:'none'} : {}}>
        <input type="file" styleName="file" onChange={upload} accept="image/gif, image/jpeg, image/png"/>
        {src ? <img styleName="img" src={src}/> : <div>
            <div styleName="icon"></div>
            <div styleName="title">上传收款码</div>
        </div>}
    </div>
)

export default CSSModules(Qrcode,styles)
