import request from '../../../utils/request'
import config from '../../../utils/config'

export function order(values){
    return request(config.server2 + 'buyagree',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function getDetail(values){
    return request(config.server2 + 'ordersee',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
