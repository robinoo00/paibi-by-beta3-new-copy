import request from '../../../utils/request'
import config from '../../../utils/config'

export function getDetail(values){
    return request(config.server2 + 'mypaymentdetailed',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function pay(values){
    return request(config.server2 + 'payment',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
/*
* 催款 no:单号，remarks：原因备注
* */
export function urge(values){
    return request(config.server2 + 'destroyfk',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
/*
* no：单号  pass：支付密码
* */
export function agree(values){
    return request(config.server2 + 'transaction',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
/*
* no:单号，remarks：原因备注
* */
export function inter(values){
    return request(config.server2 + 'intervention',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
//催单 no:单号，remarks：原因备注
export function shipments(values){
    return request(config.server2 + 'shipments',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
