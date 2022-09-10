const PROTOCAL_REG = /(^\w+:|^)\/\//;
const DOMAIN_REG = /^(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/; //extra domain
const SECONDLEVEL_DOMIN_REG = /.[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/; //extra 2nd levels domains
const LOCALHOST = ["localhost", "127.0.0.1"];
const INITIAL_ENABLE = false;
const INITIAL_DEVELOPMENT_MODE = true;
const cookieMap = new Map();
const state = {
    enable: INITIAL_ENABLE,
    developmentMode: INITIAL_DEVELOPMENT_MODE,
};
init();
function init() {
    addLocalChangeListener();
    chrome.storage.local.get(["enable", "developmentMode"], ({ enable, developmentMode }) => {
        const _enable = enable !== null && enable !== void 0 ? enable : INITIAL_ENABLE;
        const _developmentMode = developmentMode !== null && developmentMode !== void 0 ? developmentMode : INITIAL_DEVELOPMENT_MODE;
        state.enable = _enable;
        state.developmentMode = _developmentMode;
        chrome.storage.local.set({
            enable: _enable,
            developmentMode: _developmentMode,
        });
        if (enable)
            addRequestListener();
    });
}
function addLocalChangeListener() {
    chrome.storage.onChanged.addListener(function (changes) {
        if ("developmentMode" in changes) {
            const value = changes.developmentMode.newValue;
            state.developmentMode = value;
        }
        if ("enable" in changes) {
            const value = changes.enable.newValue;
            state.enable = value;
            setIcon(value);
            if (value) {
                addRequestListener();
            }
            else {
                chrome.webRequest.onBeforeSendHeaders.removeListener(requestListener);
            }
        }
    });
}
function addRequestListener() {
    chrome.webRequest.onBeforeSendHeaders.addListener(requestListener, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders", "extraHeaders"]);
}
function requestListener(details) {
    const { initiator } = details;
    console.log(state.developmentMode);
    if (state.developmentMode && !isLocal(initiator))
        return; //only allow localhost
    storeAllCookie();
    return getBeforeCookie(details);
}
function storeAllCookie() {
    chrome.cookies.getAll({}, (cookies) => {
        cookieMap.clear();
        cookies.forEach(({ domain, name, value }) => cookieMap.set(domain, `${cookieMap.has(domain) ? `${cookieMap.get(domain)};` : ""}${name}=${value}`));
    });
}
function getBeforeCookie(details) {
    if (headersHasCookie(details))
        return;
    const domain = getCookieDomain(details.url);
    if (!domain)
        return;
    let beforeCookie = cookieMap.get(domain);
    if (!beforeCookie)
        return;
    if (!details.requestHeaders)
        details.requestHeaders = [];
    details.requestHeaders.push({ name: "Cookie", value: beforeCookie });
    return { requestHeaders: details.requestHeaders };
}
function headersHasCookie(details) {
    var _a;
    return (_a = details.requestHeaders) === null || _a === void 0 ? void 0 : _a.some(({ name }) => name === "Cookie");
}
function getCookieDomain(url) {
    var _a, _b;
    if (url === "localhost")
        return url;
    const urlWidthoutProtocol = removeProtocal(url); //remove protocol
    const domain = (_a = urlWidthoutProtocol.match(DOMAIN_REG)) === null || _a === void 0 ? void 0 : _a[0];
    if (!domain)
        return;
    const res = (_b = domain.match(SECONDLEVEL_DOMIN_REG)) === null || _b === void 0 ? void 0 : _b[0];
    return res;
}
function removeProtocal(url) {
    return url.replace(PROTOCAL_REG, "");
}
function isLocal(url) {
    var _a;
    if (!url)
        return;
    const domain = (_a = removeProtocal(url).match(DOMAIN_REG)) === null || _a === void 0 ? void 0 : _a[0];
    if (!domain)
        return;
    return LOCALHOST.includes(domain);
}
function getIcon(isEnabled = false) {
    const path = isEnabled ? "cookie-enable" : "cookie";
    return `icon/${path}.png`;
}
function setIcon(value) {
    chrome.browserAction.setIcon({ path: getIcon(value) });
}
