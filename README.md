简体中文 | [English](README.en.md)
# Chrome extension:allow cookies without sameSite
## 支持 谷歌浏览器 >94版本 跨站携带cookie
> The cookie can be sent as a result of a 'cross-site' request

## 背景
许多公司都有 统一登录、Electron、本地开发等场景需要支持跨站携带``cookie``，但在 ``chrome`` 94版本之后，谷歌完全移除了``samesite``配置。 只能通过``proxy``、``< 91``版本的``chromium`` 或其它浏览器等方案去调试开发，这些方案始终不太优雅。而只需要安装此插件就可以很方便的解决这个问题。</br>如果觉得有用请点个``star``吧,如果有任何疑问欢迎提``issues``。

## 安装
1. 下载仓库中的 ``cookie-extension.zip`` 压缩包 <a href="https://github.com/newJcole/chrome-samesite-cookie/raw/main/cookie-extension.zip">点击下载</a>；
2. 打开``Chrome``浏览器，并进入扩展程序目录；
3. 打开扩展程序页面 右上角的开发者模式；
4. 将``cookie-extension.zip``拖进扩展程序页面（直接拖文件夹也可以），既安装成功；
5. 在浏览器url输入框的右上角扩展程序点开，点击``固定``按钮常驻在前台；

&nbsp;&nbsp;<img width="318" alt="image" src="https://user-images.githubusercontent.com/111993029/193226957-f9aa9eaa-096d-4ec0-a65c-867bdbfd4fd2.png">

## 使用
- 总开关(``enable``)
  - 默认为关闭状态(🍪为灰色）；
  - 通过切换 ``enable``开关来切换插件总开关；
  
- 开发者模式(``development``)
  - 默认开启（建议在``localhost``的场景下使用，同时避免CSRF攻击）；
  - 开启：则只在``localhost``下允许跨站``cookie``携带，关闭：允许所有网站使用``cookie``携带；
  
## 预览
  
&nbsp;&nbsp;&nbsp;&nbsp;<img width="203" alt="image" src="https://user-images.githubusercontent.com/111993029/193189127-5f79aa75-d95f-4a73-abfe-f8e766a3dfed.png">
