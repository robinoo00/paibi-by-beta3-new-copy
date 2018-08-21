import request from '../../../utils/request'
import config from '../../../utils/config'

export function editAliAccount(values){
    return request(config.server2 + 'modify1',{
        method:'POST',
        body:values,
        type:'form'
    })
}
export function editAliNickName(values){
    return request(config.server2 + 'modify2',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values,
    })
}
export function editAliPassword(values){
    return request(config.server2 + 'modify3',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values,
    })
}
