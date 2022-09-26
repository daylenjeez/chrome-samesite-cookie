window.onload = () => {
  const GlobalSwitch = document.querySelector(
    "#globalSwitch"
  ) as HTMLInputElement | null;

  const globalMainSwitch = document.querySelector(
    "#globalMainSwitch"
  ) as HTMLInputElement | null;

  const DevelopMode = document.querySelector(
    "#developMode"
  ) as HTMLInputElement | null;

  if (!GlobalSwitch || !DevelopMode || !globalMainSwitch) return;

  const setEnable = (enable: boolean) => {
    GlobalSwitch.checked = enable;
    globalMainSwitch.innerHTML = enable ? "enable" : "disable";
  };

  const toggleEnable = () => {
    chrome.storage.local.get(["enable"], ({ enable }) => {
      const value = !enable;
      setEnable(value);
      chrome.storage.local.set({ enable: value });
    });
  };

  chrome.storage.local.get(
    ["enable", "developMode"],
    ({ enable, developMode }) => {
      setEnable(enable);
      DevelopMode.checked = developMode;
    }
  );

  globalMainSwitch.addEventListener("click", () => toggleEnable());
  GlobalSwitch.addEventListener("click", () => toggleEnable());

  DevelopMode.addEventListener("click", (e) => {
    chrome.storage.local.get(["developMode"], ({ developMode }) => {
      if (!e) return;
      const value = !developMode;
      (e.target as HTMLInputElement).checked = value;

      chrome.storage.local.set({ developMode: value });
    });
  });
};
