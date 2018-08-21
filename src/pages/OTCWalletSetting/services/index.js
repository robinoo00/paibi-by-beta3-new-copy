import request from '../../../utils/request'
import config from '../../../utils/config'

export function setAliPay(values){
    return request(config.server2 + 'authentication',{
        method:'POST',
        body:values,
        type:'form'
    })
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}
