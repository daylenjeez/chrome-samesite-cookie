[English](README.en.md) | 简体中文
<div align=center>
  <img width="176" alt="icon" src="https://github.com/daylenjeez/chrome-samesite-cookie/assets/111993029/8dc9eeca-eb78-42cb-b6a7-635c70d2f31e">
</div>
<h1 align="center">Chrome跨站共享Cookie</h1>

<p align="center">🌟无需多余配置，一键开关即可支持 chrome 跨站携带 cookie </p>

## 功能
- 🎨支持顶级导航之间的跨域*cookie*共享；
- 🚗支持*iframe*内嵌与父级之间的跨域*cookie*共享；
- 💻支持只允许开发环境*cookie*共享；

## 安装
1. 下载仓库中的 `cookie-extension.zip` 压缩包 <a href="https://github.com/daylenjeez/chrome-samesite-cookie/raw/main/cookie-extension.zip">点击下载</a>；
2. 打开`Chrome`浏览器，并进入扩展程序目录；
3. 打开扩展程序页面 右上角的开发者模式；
4. 将`cookie-extension.zip`拖进扩展程序页面（直接拖文件夹也可以），既安装成功；
5. 在浏览器 url 输入框的右上角扩展程序点开，点击`固定`按钮常驻在前台；

## 使用
- 总开关(`Enable`)
  - 默认为关闭状态(🍪 为灰色）；
  - 通过切换 `Enable`开关来切换插件总开关；
- 开发者模式(`Dev Mode`)
  - 默认开启（建议在`localhost`的场景下使用，同时避免 CSRF 攻击）；
  - 开启：则只在`localhost`下允许跨站`cookie`携带，关闭：允许所有网站使用`cookie`携带；

## 工作流
<div align="left">
  <img alt="design" width="60%" src="https://github.com/daylenjeez/chrome-samesite-cookie/assets/111993029/69100922-54f1-4893-b0f7-7e0f389b5a25">
</div>




