window.onload = () => {
  const getIcon = (isEnabled = false) => {
    const path = isEnabled ? "cookie-enable" : "cookie";
    return `icon/${path}.png`;
  };

  const GlobalSwitch = document.querySelector(
    "#globalSwitch"
  ) as HTMLInputElement | null;
  if (!GlobalSwitch) return;
  chrome.storage.local.get(
    ["enable"],
    ({ enable }) => (GlobalSwitch.checked = enable)
  );

  GlobalSwitch.addEventListener("click", (e) => {
    chrome.storage.local.get(["enable"], ({ enable }) => {
      if (!e) return;
      const value = !enable;
      (e.target as HTMLInputElement).checked = value;
      chrome.storage.local.set({ enable: value });
      chrome.browserAction.setIcon({ path: getIcon(value) });
    });
  });
};
