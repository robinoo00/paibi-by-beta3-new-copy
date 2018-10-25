import {Carousel} from 'antd-mobile'
import ban1 from '../images/banner1.png';
import ban2 from '../images/banner2.png';
import ban3 from '../images/banner3.png';
import router from 'umi/router'
import params from '../../../utils/params'
import config from '../../../utils/config'

const banner = [
    {src:config.ip + '/pic/banner1.png?time='+ new Date().valueOf(),id:9},
    {src:config.ip + '/pic/banner2.png?time='+ new Date().valueOf(),id:10},
    {src:config.ip + '/pic/banner3.png?time='+ new Date().valueOf(),id:11}
]

const Banner = () => {
    return (
        <div>
            <Carousel
                autoplay={true}
                infinite
                autoplayInterval={5000}
            >
                {banner.map(val => (
                    <a
                        key={val.src}
                        href="javascript:;"
                        style={{ display: 'inline-block', width: '100%' }}
                        onClick={() => {router.push({pathname:'newsDetail',query:{id:val.id,type:params.NEWS_KNOWLEDGE}})}}
                    >
                        <img
                            src={val.src}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top',height:'1.13rem' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner

