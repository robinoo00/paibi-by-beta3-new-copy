import request from '../../../utils/request'
import config from '../../../utils/config'

//产品相关介绍
export function order(values){
    return request(config.server2 + 'buyagree',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
