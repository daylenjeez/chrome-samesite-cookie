简体中文 | [English](README.en.md)

## Chrome Cross Samesite Coookie

无需多余配置，一键开关即可支持 `chrome` 任意版本跨站携带 `cookie` ；同时支持开启本地模式，让插件只生效与本地域名而不影响其他环境

## 安装

1. 下载仓库中的 `cookie-extension.zip` 压缩包 <a href="https://github.com/daylenjeez/chrome-samesite-cookie/raw/main/cookie-extension.zip">点击下载</a>；
2. 打开`Chrome`浏览器，并进入扩展程序目录；
3. 打开扩展程序页面 右上角的开发者模式；
4. 将`cookie-extension.zip`拖进扩展程序页面（直接拖文件夹也可以），既安装成功；
5. 在浏览器 url 输入框的右上角扩展程序点开，点击`固定`按钮常驻在前台；

## 使用

- 总开关(`enable`)
  - 默认为关闭状态(🍪 为灰色）；
  - 通过切换 `enable`开关来切换插件总开关；
- 开发者模式(`development`)
  - 默认开启（建议在`localhost`的场景下使用，同时避免 CSRF 攻击）；
  - 开启：则只在`localhost`下允许跨站`cookie`携带，关闭：允许所有网站使用`cookie`携带；

## 预览

&nbsp;&nbsp;&nbsp;&nbsp;<img width="203" alt="image" src="https://user-images.githubusercontent.com/111993029/193189127-5f79aa75-d95f-4a73-abfe-f8e766a3dfed.png">
