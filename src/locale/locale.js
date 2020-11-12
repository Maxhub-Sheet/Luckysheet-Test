import en from './en'
import zh from './zh'
import es from './es'
import Store from '../store';
import _loacel from '../maxhubExtendScript/_loacel';    

const localeObj = {
    'en':en,
    'zh':zh,
    'es':es
}

function locale(){
    return mixinLocale(localeObj[Store.lang]);   /* #wdd-0004 引入模块，修改和扩展locale配置项*/
}

function mixinLocale(source){
    let localeObject = _loacel[Store.lang];
    for (const key in localeObject) {
       source[key] = Object.assign(source[key],localeObject[key]);
    }
    return source;
}

export default locale;