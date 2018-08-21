import request from '../../../utils/request'
import config from '../../../utils/config'

export function inCash(values){
    return request(config.server2 + 'changeinto',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function outCash(values){
    return request(config.server2 + 'changeout',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
