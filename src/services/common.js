import request from '../utils/request';
import config from "../utils/config";


export function getRate(values) {
    return request(config.server2 + 'change',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values,
    })
}
