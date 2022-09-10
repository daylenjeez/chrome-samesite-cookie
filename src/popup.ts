window.onload = () => {
  const GlobalSwitch = document.querySelector(
    "#globalSwitch"
  ) as HTMLInputElement | null;

  const DevelopmentMode = document.querySelector(
    "#developmentMode"
  ) as HTMLInputElement | null;

  if (!GlobalSwitch || !DevelopmentMode) return;
  chrome.storage.local.get(
    ["enable", "developmentMode"],
    ({ enable, developmentMode }) => {
      GlobalSwitch.checked = enable;
      DevelopmentMode.checked = developmentMode;
    }
  );

  GlobalSwitch.addEventListener("click", (e) => {
    chrome.storage.local.get(["enable"], ({ enable }) => {
      if (!e) return;
      const value = !enable;
      (e.target as HTMLInputElement).checked = value;
      chrome.storage.local.set({ enable: value });
    });
  });

  DevelopmentMode.addEventListener("click", (e) => {
    chrome.storage.local.get(["developmentMode"], ({ developmentMode }) => {
      if (!e) return;
      const value = !developmentMode;
      (e.target as HTMLInputElement).checked = value;

      chrome.storage.local.set({ developmentMode: value });
    });
  });
};
