var settings = require('electron-settings');
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var settingsWindow;
var onClosedCb;

function createWindow(onClosed) {
    onClosedCb = onClosed;
    settingsWindow = new BrowserWindow({width: 385, height: 390, show: false, resizable: false});
    // and load the index.html of the app.
    settingsWindow.loadURL(`file://${__dirname}/settings.html`);
    settingsWindow.once('ready-to-show', function () {
        settingsWindow.show();
    });
    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
}


electron.ipcMain.on('save-settings', function (event, arg) {
    try {
        settings.set('serverUrl', arg.serverUrl);
        settings.set('eimzaUrl', arg.eimzaUrl);
        settings.set('reportUrl', arg.reportUrl);
        event.returnValue = 'success';
        onClosedCb(true);
    } catch (e) {
        console.log(e);
    }
});

function destroy() {
    settingsWindow.destroy();
}

module.exports = {
    destroy: destroy,
    createWindow: createWindow
};