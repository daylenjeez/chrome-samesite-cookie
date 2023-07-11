English | [简体中文](README.md)
# Chrome extension:allow cookies without sameSite
## Support cross-site cookie carrying in Google Chrome >94.
> The cookie can be sent as a result of a 'cross-site' request

## Background
Many companies require support for ``cross-site cookie`` carrying in scenarios such as unified login, Electron and local development. However, Google completely removed the samesite configuration in Chrome version ``94``. To debug and develop, you can only use solutions such as ``proxy``,``Chromium version <91`` or other browsers, which are not very elegant. With the installation of this plugin, you can easily solve this problem. If you find it useful, please give it a star. If you have any questions, please feel free to raise an ``issue``.

## Install
1. Download the ``cookie-extension.zip`` compressed file from the repository. <a href="https://github.com/newJcole/chrome-cross-domain-cookie/raw/main/cookie-extension.zip">download</a>;
2. Open the ``Chrome`` and go to the extensions directory;
3. Open the developer mode in the upper-right corner of the extensions page;
4. Drag the ``cookie-extension.zip`` file into the extensions page (you can also drag the folder directly) to install it successfully;
5. Click the ``Pin`` button in the upper-right corner of the extension icon in the browser URL input box to keep it permanently in the foreground;


<img width="466" alt="image" src="https://user-images.githubusercontent.com/111993029/193187984-9d9a3b73-8513-410d-9c84-811944e647d5.png">

## Useage
- Switch(``enable``)
  - Default state is disabled(🍪is gray);
  - Switch the master switch of the plugin by toggling the ``enable`` switch;
  
- Developer mode(``development``)
  - Default state is enable(It is recommended to use this in a ``localhost`` scenario, while also avoiding CSRF attacks);
  - Enabled:only allows cross-site cookie carrying on ``localhost``;Disabled: allows cookie carrying on all websites;
  
## Preview
  
&nbsp;&nbsp;&nbsp;&nbsp;<img width="203" alt="image" src="https://user-images.githubusercontent.com/111993029/193189127-5f79aa75-d95f-4a73-abfe-f8e766a3dfed.png">
