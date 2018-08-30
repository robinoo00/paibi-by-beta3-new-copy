import request from '../../../utils/request'
import config from '../../../utils/config'

export function getList(values){
    return request(config.server2 + 'orderlist',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function myOrder (values){
    return request(config.server2 + 'myorder',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function cancel (values){
    return request(config.server2 + 'undo',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
