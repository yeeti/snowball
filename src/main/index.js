import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';
const userData = app.getPath('userData'); // ELECTRON: USER DATA IS WHERE THIS APP STORES ITS OWN FILES

let window;
let contents;

app.on('ready', () => {

  let appSession = session.fromPartition('appSession'); // ELECTRON: creates our own session from a partition

  window = new BrowserWindow({minWidth: 1268, minHeight: 800, show: false, useContentSize: true});
  window.maximize();

  if (isDevelopment)
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  else
    window.loadURL(formatUrl({ pathname: path.join(__dirname, 'index.html'), protocol: 'file', slashes: true }));

  /**************************
  -> window lifecycle functions
  **************************/

  // ELECTRON: this is used to load the window smoothly and only show it when the browserWindow is ready
  window.once('ready-to-show', () => { window.show(); });
  window.on('unresponsive', function () { });
  window.on('responsive', function () { });


  /**************************
  -> WebContent
  **************************/
  contents = window.webContents;

  contents.openDevTools();
  contents.on('crashed', function () { console.log('app crashed'); });
  contents.on('context-menu', function (event, params) { console.log('context menu'); }); // ELECTRON: when you right click this event is called

  /**************************
  -> SESSION
  **************************/

  console.log(session); // ELECTRON: defaultSession is persisted.

});

app.on('before-quit', (ev) => {
  console.log('App is about to quit');
});


app.on('browser-window-blur', (ev) => {
  console.log('browser-window-blur');
  app.setBadgeCount(1); // ELECTRON:
  // setTimeout(app.quit, (1000 * 60 * 2));
});

app.on('browser-window-focus', (ev) => {
  console.log('browser-window-focus');
});

process.on('uncaughtException', function (err) { console.log('⛔[ERROR] -> ' + err); })
