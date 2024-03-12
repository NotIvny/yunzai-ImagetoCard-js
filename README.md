# yunzai-ImagetoCard-js
适用于Yunzai-Bot的渲染图转卡片插件，通过桑帛云API将渲染好的图片自动转换为json卡片

部分API代码参考他人
## **简易安装方式**
快速上手：无yunzai-copyfiles-js，使用腾讯图床，使用桑帛云API

1.下载js插件，替换./lib/puppeteer/puppeteer.js

2.编辑puppeteer.js，设置groupid为作为图床的群(建议拉Bot新建一个群，每次转卡片都会发一次图)

## 通过yunzai-copyfile-js实现js替换与备份:
1.在云崽目录下，输入
```
mkdir copyfiles
cd ./copyfiles
mkdir puppeteer
mkdir puppeteer-reroll
mv ../lib/puppeteer/puppeteer.js ./puppeteer-reroll
curl -o ./puppeteer https://raw.githubusercontent.com/NotIvny/yunzai-ImagetoCard-js/main/puppeteer.js
```
2.启动云崽，输入命令

#增加操作puppeteer-reroll,./copyfiles/puppeteer/puppeteer.js,./lib/puppeteer/puppeteer.js

#增加操作puppeteer,./copyfiles/puppeteer/puppeteer.js,./lib/puppeteer/puppeteer.js

#文件替换puppeteer

## 使用本地图床:
1.下载js插件，替换./lib/puppeteer/puppeteer.js

2.在云崽同级目录下，安装https://github.com/Zyy955/character-Api （咕咕牛图仓无需克隆），并启动咕咕牛图库

3.编辑puppeteer.js，配置character_api，设置image_host = 1
