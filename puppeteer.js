
import Renderer from '../renderer/loader.js'
import fs from 'fs'
import moment from "moment" 
/**
 * 暂时保留对手工引用puppeteer.js的兼容
 * 后期会逐步废弃
 * 只提供截图及分片截图功能
 */
//图转卡api地址
const api_type = 0
const api0 = 'https://api.lolimi.cn/API/ark/a.php'
const api1 = ''
//图床类型，0为腾讯图床，1为本地图床
const image_host = 0;
//配置QQ图床群的群号，image_host = 0 时需要
const groupid = ''
//character-Api公网地址，image_host = 1 时需要
const character_api = 'server_ip:3000'
//标题，外显等可选配置
const bt = ''
const bt2 = ''
const yx = ''
let renderer = Renderer.getRenderer()
renderer.screenshot = async (name, data) => {
let img = await renderer.render(name, data)
if(image_host == 1){
    const imageData = Buffer.from(img, 'base64');
    let time = moment().format('YYYYMMDDhhmmss');
    const filePath = `../character-Api/data/normal-character/${time}/p.png`;
    fs.mkdir(`../character-Api/data/normal-character/${time}`,(err) => {
        if (err){
            logger.error(err);
        }
    })
    fs.writeFile(filePath, imageData, 'base64', (err) => {
        if (err) {
            logger.error(err);
        }
    });
    img = `http://${character_api}/api/miao?name=${time}`
}else{
    await Bot.pickGroup(groupid).sendMsg(segment.image(img))
    let source = (await Bot.pickGroup(groupid).getChatHistory(Bot.source, 1)).pop()
    for (let i of source.message) {
        if (i.type == 'image') {
            img = i.url
        }
    }
}
    
let url
if(api_type == 0){
    url = api0 + `?img=${img}&bt=${bt}&bt2=${bt2}&yx=${yx}`
}else{
    url = api1 + `?url=${img}&title=${bt}&subtitle=${bt2}&yx=${yx}`
}
let res = await fetch(url).catch((err) => logger.error(err));
            if (!res) {
                logger.error('查询接口请求失败');
                return await this.reply('查询接口请求失败');
            }
res = await res.json();
logger.error(res);
if(image_host == 1){
    fs.rmdir(`../character-Api/data/normal-character/${time}/p.png`, (err) => {
        if (err){
            logger.error('err');
        }
    });
}
return segment.json(res)                     
}

renderer.screenshots = async (name, data) => {
    data.multiPage = true
    let imgs = await renderer.render(name, data) || []
    let ret = []
    for (let img of imgs) {
        ret.push(img ? segment.image(img) : img)
    }
    return ret.length > 0 ? ret : false
}

export default renderer