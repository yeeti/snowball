import { app, BrowserWindow } from 'electron';
import path from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';
const userData = app.getPath('userData'); // ELECTRON: USER DATA IS WHERE THIS APP STORES ITS OWN FILES

let window;

app.on('ready', () => {
  console.log('✅ APP RUNNING');
  window = new BrowserWindow({width: 1024, height: 800, show: false});

  if (isDevelopment)
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  else
    window.loadURL(formatUrl({ pathname: path.join(__dirname, 'index.html'), protocol: 'file', slashes: true }));

  window.once('ready-to-show', () => {
    window.show();
  });
  window.webContents.openDevTools();
  window.webContents.on('crashed', function () { console.log('app crashed'); });
  window.on('unresponsive', function () { });
});

app.on('before-quit', (ev) => {
  console.log('App is about to quit');
});


app.on('browser-window-blur', (ev) => {
  console.log('browser-window-blur');
  app.setBadgeCount(1); // ELECTRON:
  setTimeout(app.quit, (1000 * 60 * 2));
});

app.on('browser-window-focus', (ev) => {
  console.log('browser-window-focus');
});

process.on('uncaughtException', function (err) { console.log('⛔[ERROR] -> ' + err); })
