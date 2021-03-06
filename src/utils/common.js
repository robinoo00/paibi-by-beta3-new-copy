import config from './config'
import theme from './themes'
//滚动加载
let temp = null;
export function scrollLoadMore(callback) {
    setTimeout(() => {
        // window.addEventListener('scroll', () => {loadMore(callback)})
        temp = () => {loadMore(callback)};
        window.addEventListener('scroll', temp)
    }, 200)
}
//取消滚动监听
export function removeScrollListener() {
    // window.removeEventListener('scroll',loadMore);
    window.removeEventListener('scroll',temp);
}
//滚动加载
function loadMore(callback) {
    const scrollPos = getScrollPos();
    if ((scrollPos + document.body.clientHeight) === document.body.scrollHeight) {
        callback && callback();
    }
}

//获取滚动位置
export function getScrollPos(){
    let scrollPos = 0;
    if (typeof window.pageYOffset !== 'undefined') {
        scrollPos = window.pageYOffset;
    }
    else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (typeof document.body !== 'undefined') {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}
//根据时间戳获取时间格式
export function getFormatTime(stampTime = (new Date()).getTime(),string = 'yyyy-MM-dd'){
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,         //月份
            "d+": this.getDate(),          //日
            "h+": this.getHours(),          //小时
            "m+": this.getMinutes(),         //分
            "s+": this.getSeconds(),         //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()       //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                    ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return new Date(stampTime).Format(string);
}
//复制到剪切板
export function copyToClipboard (text) {
    if(text.indexOf('-') !== -1) {
        let arr = text.split('-');
        text = arr[0] + arr[1];
    }
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
        alert(msg);
    } catch (err) {
        alert('该浏览器不支持点击复制到剪贴板');
    }
    document.body.removeChild(textArea);
}
//随机颜色
export function randomColor() {
    // Math.floor(Math.random()*(max-min+1)+min);
    // var r=Math.floor(Math.random()*256);
    // var g=Math.floor(Math.random()*256);
    // var b=Math.floor(Math.random()*256);
    var r = Math.floor(Math.random()*(255-130+1)+130);
    var g = Math.floor(Math.random()*(255-130+1)+130);
    var b = Math.floor(Math.random()*(255-130+1)+130);
    return "rgb("+r+','+g+','+b+")";
}
/*
* 获取URL参数
* name 参数名
* */
export function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};
//发送K线数据请求
export function chooseKType(code,type ='分时'){
    var work = window.$.connection.myHub;
    window.$.connection.hub.url = 'http://106.14.126.147:1008/lcc';
    window.$.connection.hub.start().done(function () {
        work.server.k线(code, type, "");
    });
}
//设置主题背景色
export function setTheme2(pathname){
    const {Theme2_comp} = config
    const root = document.getElementById('root');
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    if(Theme2_comp.includes(pathname)){//主题2
        root.style.backgroundColor = theme.Theme2BgColor
        body.style.backgroundColor = theme.Theme2BgColor
        html.style.backgroundColor = theme.Theme2BgColor
        root.style.color = theme.Theme2FontColor
        root.classList.add('theme2')
        root.classList.remove('theme1')
    }else{//主题1
        root.style.backgroundColor = theme.Theme1BgColor
        body.style.backgroundColor = theme.Theme1BgColor
        html.style.backgroundColor = theme.Theme1BgColor
        root.style.color = theme.Theme1FontColor
        root.classList.add('theme1')
        root.classList.remove('theme2')
    }
}
//暂停
export function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

export function FormatAfterDotNumber( ValueString, nAfterDotNum )
{
    var ValueString,nAfterDotNum ;
    var resultStr,nTen;
    ValueString = ""+ValueString+"";
    var strLen = ValueString.length;
    var dotPos = ValueString.indexOf(".",0);
    if (dotPos == -1)
    {
        resultStr = ValueString+".";
        for (let i=0; i<nAfterDotNum ;i++)
        {
            resultStr = resultStr+"0";
        }
        return resultStr;
    }
    else
    {
        if ((strLen - dotPos - 1) >= nAfterDotNum ){
            let nAfter = dotPos + nAfterDotNum  + 1;
            nTen =1;
            for(let j=0;j<nAfterDotNum ;j++){
                nTen = nTen*10;
            }
            resultStr = Math.round(parseFloat(ValueString)*nTen)/nTen;
            return resultStr;
        }
        else{
            resultStr = ValueString;
            for (let i=0;i<(nAfterDotNum  - strLen + dotPos + 1);i++){
                resultStr = resultStr+"0";
            }
            return resultStr;
        }
    }
}
