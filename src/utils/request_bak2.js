import fetch from 'dva/fetch';
import config from './config'
import router from 'umi/router'
import {Toast} from 'antd-mobile'
import {sleep, test} from './common'

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
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if (!config.UN_SHOW_LOADING_URLS.includes(api)) {
                window.hideAll();
            }
            return {data: data};
        })
        .catch(err => {
            console.log(err);
            if (err.toString() == 'TypeError: Failed to fetch') {
                let key = localStorage.getItem(config.KEY);
                if (re_options.type === 'form') {
                    re_options.body.append('key', key.replace(/\+/g, '%2B'))
                }else{
                    re_body['key'] = key.replace(/\+/g, '%2B');
                    const keys = Object.keys(re_body);
                    let querystring = '';
                    keys.map(key => {
                        querystring += key + '=' + re_body[key] + '&'
                    })
                    querystring = querystring.substring(0, querystring.length - 1);
                    re_options.body = querystring;
                }
                return fetch(url, re_options)
                    .then(checkStatus)
                    .then(parseJSON)
                    .then(data => {
                        console.log('request_getcid',data)
                        return {data: data};
                    })
                    .catch(err => {
                        Toast.info('账号异常,请重新登录',1);
                        console.log('err',err)
                        router.push({
                            pathname: '/login'
                        })
                        return {data:null};
                    });
            } else {
                return {data: ""};
            }
        });
}

function getCid(url, options,body) {
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
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            console.log('request_getcid',data)
            return {data: data};
        })
        .catch(err => {
            console.log(err)
        });
}
