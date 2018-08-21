import {Button} from 'antd-mobile'
import {connect} from 'dva'
import themes from '../../utils/themes'

function getBgColor(theme,bgColor){
    let resultBgColor = bgColor;
    if(!resultBgColor){
        switch (theme){
            case 1:
                resultBgColor = themes.Theme1BlueColor
                break
            case 2:
                resultBgColor = themes.Theme2BlueColor
                break
        }
    }
    return resultBgColor
}

const MyButton  = ({theme,title,bgColor=null,callBack=() => {},disabled = false}) => (
    <Button type={'primary'}
            style={
                {
                    backgroundColor: getBgColor(theme,bgColor),
                    lineHeight: '.44rem',
                    height: '.44rem'
                }
            }
            onClick={callBack}
            disabled={disabled}
    >{title}</Button>
)

const mapStateToProps = state => ({
    theme:state.god.theme
})

export default connect(mapStateToProps)(MyButton)
