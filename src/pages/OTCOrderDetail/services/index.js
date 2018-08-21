import request from '../../../utils/request'
import config from '../../../utils/config'

export function cui(values){
    return request(config.server2 + 'destroyfk',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function inter(values){
    return request(config.server2 + 'intervention',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
