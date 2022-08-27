type Props = {
  readonly cookieMap: Map<string, string>;
};

const cookieMap = new Map<string, string>();

init();

function init() {
  storeAllCookie();
  addLocalChangeListener();
  chrome.storage.local.set({ enable: true }, addRequestListener);
}

function addLocalChangeListener() {
  chrome.storage.onChanged.addListener(function (changes) {
    if ("enable" in changes) {
      if (changes.enable.newValue) {
        addRequestListener();
      } else {
        chrome.webRequest.onBeforeSendHeaders.removeListener(setCookie);
      }
    }
  });
}

async function addRequestListener() {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details: chrome.webRequest.WebRequestHeadersDetails) => {
      storeAllCookie();
      setCookie(details);
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders", "extraHeaders"]
  );
}

function storeAllCookie() {
  chrome.cookies.getAll({}, (cookies) => {
    cookieMap.clear();
    cookies.forEach(({ domain, name, value }) =>
      cookieMap.set(domain, `${cookieMap.get(domain) ?? ""};${name}=${value};`)
    );
  });
}

function setCookie(details: chrome.webRequest.WebRequestHeadersDetails) {
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
  const urlWidthoutProtocol = url.replace(/(^\w+:|^)\/\//, ""); //remove protocol

  const DOMAIN_REG = /^(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/; //extra domain
  const SECONDLEVEL_DOMIN_REG = /.[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/; //extra 2nd levels domains

  const domain = urlWidthoutProtocol.match(DOMAIN_REG)?.[0];
  if (!domain) return;

  const res = domain.match(SECONDLEVEL_DOMIN_REG)?.[0];
  return res;
}
