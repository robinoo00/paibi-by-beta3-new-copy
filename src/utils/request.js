import fetch from 'dva/fetch';
import config from './config'
import router from 'umi/router'
import {Toast} from 'antd-mobile'

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    let re_options = options
    let re_body = options.body
    let key = localStorage.getItem(config.KEY)
    let match = url.match(/api\/(\S*)?/);
    if (!match) {
        match = url.match(/usdt\/(\S*)?/);
    }
    const api = match[1];
    if (!key && api != 'login' && api != 'register' && api != 'getcid') {
        router.push('login');
        return {data: ''};
    }
    if (!config.UN_SHOW_LOADING_URLS.includes(api)) {
        window.loading('', 0);
    }

    if (options.type !== 'form' && options.method === 'POST' && typeof options.body !== 'undefined' && typeof options.body === 'object') {
        const body = options.body;
        if(key){
            body['key'] = key.replace(/\+/g, '%2B');
        }
        const keys = Object.keys(body);
        let querystring = '';
        keys.map(key => {
            querystring += key + '=' + body[key] + '&'
        })
        querystring = querystring.substring(0, querystring.length - 1);
        options.body = querystring;
    }
    if (options.type === 'form') {
        options.body.append('key', key.replace(/\+/g, '%2B'))
    }
    return _fetch(url,options)
        .then(data => {
            if(data){
                if(!config.UN_SHOW_LOADING_URLS.includes(api)){
                    window.hideAll();
                }
                return {
                    data:data
                }
            }else{
                return secondFetchForKey(url,re_options,re_body).then(data2 => {
                    if(!config.UN_SHOW_LOADING_URLS.includes(api)){
                        window.hideAll();
                    }
                    return {data:data2}
                }).catch(err => {
                    Toast.info('账号异常,请重新登录',1);
                    router.push({
                        pathname: '/login'
                    })
                    return {data:null};
                })
            }
        })
}

function _fetch(url,options){
    return new Promise((resolve,reject) => {
        fetch(url, options)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                resolve(null)
            });
    })
}

function secondFetchForKey(url, options,body) {
    return new Promise((resolve,reject) => {
        let key = localStorage.getItem(config.KEY);
        if (options.type === 'form') {
            options.body.append('key', key.replace(/\+/g, '%2B'))
        }else{
            body['key'] = key.replace(/\+/g, '%2B');
            const keys = Object.keys(body);
            let querystring = '';
            keys.map(key => {
                querystring += key + '=' + body[key] + '&'
            })
            querystring = querystring.substring(0, querystring.length - 1);
            options.body = querystring;
        }
        fetch(url, options)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject('error')
            });
    })
}
