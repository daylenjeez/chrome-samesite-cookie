English | [简体中文](README.md)

<div align=center>
<img width="176" alt="image" src="https://github.com/daylenjeez/chrome-samesite-cookie/assets/111993029/8dc9eeca-eb78-42cb-b6a7-635c70d2f31e">
</div>
<h1 align="center">Chrome SameSite Cookie</h1>

<p align="center">🌟 No additional configuration required, one-click switch to support Chrome cross-site cookie carrying </p>

## Installation

1. Download the `cookie-extension.zip` compressed package from the repository <a href="https://github.com/daylenjeez/chrome-samesite-cookie/raw/main/cookie-extension.zip">Click to Download</a>;
2. Open the `Chrome` browser and go to the extension directory;
3. Open the developer mode in the upper right corner of the extension page;
4. Drag and drop `cookie-extension.zip` into the extension page (you can also directly drag the folder), it is installed successfully;
5. Click the `Pin` button in the upper right corner of the browser URL input box to keep it in the foreground;

## Usage

- Master Switch (`Enable`)
  - Default is off (🍪 is gray);
  - Switch the `Enable` switch to toggle the plugin's master switch;
- Developer Mode (`Dev Mode`)
  - It is turned on by default (recommended for use in the `localhost` scenario to avoid CSRF attacks);
  - On: only allows cross-site `cookie` carrying under `localhost`, Off: allows all websites to use `cookie` carrying;
