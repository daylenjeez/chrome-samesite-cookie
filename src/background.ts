type Props = {
  readonly cookieMap: Map<string, string>;
};

const PROTOCAL_REG = /(^\w+:|^)\/\//;
const DOMAIN_REG = /^(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/; //extra domain
const SECONDLEVEL_DOMIN_REG = /.[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/; //extra 2nd levels domains
const LOCALHOST = ["localhost", "127.0.0.1"];
const INITIAL_ENABLE = false;
const INITIAL_DEVELOPMENT_MODE = true;

const cookieMap = new Map<string, string>();
const state = {
  enable: INITIAL_ENABLE,
  developMode: INITIAL_DEVELOPMENT_MODE,
};

init();

function init() {
  addLocalChangeListener();
  chrome.storage.local.get(
    ["enable", "developMode"],
    ({ enable, developMode }) => {
      const _enable = enable ?? INITIAL_ENABLE;
      const _developMode = developMode ?? INITIAL_DEVELOPMENT_MODE;

      state.enable = _enable;
      state.developMode = _developMode;

      setIcon(_enable);

      chrome.storage.local.set({
        enable: _enable,
        developMode: _developMode,
      });
      if (enable) addRequestListener();
    }
  );
}

function addLocalChangeListener() {
  chrome.storage.onChanged.addListener(function (changes) {
    if ("developMode" in changes) {
      const value = changes.developMode.newValue;
      state.developMode = value;
    }

    if ("enable" in changes) {
      const value = changes.enable.newValue;
      state.enable = value;
      setIcon(value);
      if (value) {
        addRequestListener();
      } else {
        chrome.webRequest.onBeforeSendHeaders.removeListener(requestListener);
      }
    }
  });
}

function addRequestListener() {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    requestListener,
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders", "extraHeaders"]
  );
}

function requestListener(details: chrome.webRequest.WebRequestHeadersDetails) {
  const { initiator } = details;
  console.log(state.developMode);
  if (state.developMode && !isLocal(initiator)) return; //only allow localhost

  storeAllCookie();
  return getBeforeCookie(details);
}

function storeAllCookie() {
  chrome.cookies.getAll({}, (cookies) => {
    cookieMap.clear();
    cookies.forEach(({ domain, name, value }) =>
      cookieMap.set(
        domain,
        `${
          cookieMap.has(domain) ? `${cookieMap.get(domain)};` : ""
        }${name}=${value}`
      )
    );
  });
}

function getBeforeCookie(details: chrome.webRequest.WebRequestHeadersDetails) {
  if (headersHasCookie(details)) return;

  const domain = getCookieDomain(details.url);
  if (!domain) return;

  let beforeCookie = cookieMap.get(domain);
  if (!beforeCookie) return;

  if (!details.requestHeaders) details.requestHeaders = [];

  details.requestHeaders.push({ name: "Cookie", value: beforeCookie });
  return { requestHeaders: details.requestHeaders };
}

function headersHasCookie(details: chrome.webRequest.WebRequestHeadersDetails) {
  return details.requestHeaders?.some(({ name }) => name === "Cookie");
}

function getCookieDomain(url: string) {
  if (url === "localhost") return url;
  const urlWidthoutProtocol = removeProtocal(url); //remove protocol

  const domain = urlWidthoutProtocol.match(DOMAIN_REG)?.[0];
  if (!domain) return;

  const res = domain.match(SECONDLEVEL_DOMIN_REG)?.[0];
  return res;
}

function removeProtocal(url: string) {
  return url.replace(PROTOCAL_REG, "");
}

function isLocal(url?: string) {
  if (!url) return;
  const domain = removeProtocal(url).match(DOMAIN_REG)?.[0];
  if (!domain) return;
  return LOCALHOST.includes(domain);
}

function getIcon(isEnabled = false) {
  const path = isEnabled ? "cookie-enable" : "cookie";
  return `icon/${path}.png`;
}

function setIcon(value: boolean) {
  chrome.browserAction.setIcon({ path: getIcon(value) });
}
