window.onload = () => {
    const GlobalSwitch = document.querySelector("#globalSwitch");
    const globalMainSwitch = document.querySelector("#globalMainSwitch");
    const DevelopMode = document.querySelector("#developMode");
    if (!GlobalSwitch || !DevelopMode || !globalMainSwitch)
        return;
    const setEnable = (enable) => {
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
    chrome.storage.local.get(["enable", "developMode"], ({ enable, developMode }) => {
        setEnable(enable);
        DevelopMode.checked = developMode;
    });
    globalMainSwitch.addEventListener("click", () => toggleEnable());
    GlobalSwitch.addEventListener("click", () => toggleEnable());
    DevelopMode.addEventListener("click", (e) => {
        chrome.storage.local.get(["developMode"], ({ developMode }) => {
            if (!e)
                return;
            const value = !developMode;
            e.target.checked = value;
            chrome.storage.local.set({ developMode: value });
        });
    });
};
