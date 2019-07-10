/**
 * Created by cabbar on 01.06.2017.
 */
var httpProxy = require('http-proxy');
const {autoUpdater} = require("electron-updater");
const {session} = require('electron')
const log = require('electron-log');
const fs = require('fs');
const request = require('request');
const _url = require('url');
var path = require('path');
// var child_process = require('child_process');


// const Config = require('electron-config');
var proxy = httpProxy.createProxyServer({changeOrigin: true});
const html = __dirname + '/';

const port = 4000;
const apiUrl = '/api';

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const PDFWindow = require('electron-pdf-window');

// var host = 'http://10.10.5.150';
//var host = 'http://10.30.0.195';
//var reportHost = 'http://10.30.0.195';
//var host = 'http://srvgumrukapp';
var host = 'http://GRMREPORT';
var reportHost = 'http://GRMREPORT';


var reportUrl = reportHost + ':8080/jasperserver/';
var _reportUrl = reportHost + ':8080';
var serviceUrl = host + '/gtbebeyan';
// var serviceUrl = 'http://192.168.1.18/ebeyanv2';


var userDataDir = 'C://ebeyan';
var reportDir = userDataDir;


// Config file

// const config = new Config();
// config.get('apiService', 'http://192.168.1.18/gtbebeyan');

// var bat = require.resolve('imza/start.bat');
// child_process.exec(bat, function(error, stdout, stderr) {
// console.log('imza run stop');
// console.log('error' +error);
// console.log('stdout ' + stdout);
// console.log('stderr ' + stderr);
// });

if (!fs.existsSync(userDataDir)) {
    mkdirP(userDataDir, 777);
    if (!fs.existsSync(reportDir)) {
        mkdirP(reportDir, 777);
    }
}


function mkdirP(p, mode, f) {
    var cb = f || function () {
    };
    if (p.charAt(0) != '/') {
        cb('Relative path: ' + p);
        return;
    }

    var ps = path.normalize(p).split('/');
    path.exists(p, function (exists) {
        if (exists) {
            cb(null);
        }
        else {
            mkdirP(ps.slice(0, -1).join('/'), mode, function (err) {
                if (err && err.errno != process.EEXIST) {
                    cb(err);
                }
                else {
                    fs.mkdir(p, mode, cb);
                }
            });
        }
    });
};


var win;

function sendStatusToWindow(text) {
    console.log(text);
    log.info(text);
    win.webContents.send('message', text);
}

function createDefaultWindow() {
    win = new BrowserWindow();
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
    win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
    return win;
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
});


express().use(compression())
    .use(bodyParser.json())//json parser
    .use(bodyParser.urlencoded({extended: false}))//urlencoded parser
    // Static content
    .use(express.static(html))
    .all("/api/*", function (req, res) {
        // proxy.web(req, res, {target: 'http://10.10.5.150/gtbebeyan'});
        proxy.web(req, res, {target: serviceUrl});
    })
    .all("/pdf/detaylibeyan/:id", function (req, res) {
        openPdf(req.params.id, 'Beyanname');
        res.json(200, {isSucess: true, status: 0});
    })
    .all("/pdf/detaylibeyanbos/:id", function (req, res) {
        openPdf(req.params.id, 'BeyannameBos');
        res.json(200, {isSucess: true, status: 0});
    })
    .all("/report/:reportName", function (req, res) {
        openPdf(req.params.reportName);
        res.json(200, {isSucess: true, status: 0});
    })
    .all("/dinazor/*", function (req, res) {
        proxy.web(req, res, {target: 'http://localhost:5101 '});
    })
    .all("/tcmb/*", function (req, res) {
        proxy.web(req, res, {target: 'http://www.tcmb.gov.tr/kurlar'});
    })
    .listen(port, function () {
        console.log('Port: ' + port);
        console.log('Html: ' + html);
    });

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});


proxy.on('proxyReq', function (proxyReq, req, res, options) {
    var body;
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('x-www-form-urlencoded') > 0) {
        body = req.body;
        body = Object.keys(body).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
        }).join('&');
        proxyReq.setHeader('Content-Type', req.headers['content-type']);
    } else if (req.body) {
        body = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    proxyReq.setHeader('Content-Length', Buffer.byteLength(body));
    proxyReq.write(body);
    proxyReq.end();
});


const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow();
    mainWindow.maximize();
    // and load the index.html of the app.
    mainWindow.loadURL('http:/localhost:4000');
    // Open the DevTools.
    //  mainWindow.webContents.openDevTools()
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    autoUpdater.checkForUpdatesAndNotify();
}


function openPdf(id, reportName) {
    request(reportUrl + 'login/rest/login?j_username=jasperadmin&j_password=jasperadmin', function (err, res) {
        var arr = res.headers['set-cookie'];
        var j = request.jar();
        var session = arr[0].split(';')[0];
        var sessionId = session.substring(11);
        console.log(sessionId)
        var url = reportUrl + 'rest_v2/reports/reports/Ebeyan/' + reportName + '.pdf';
        console.log(url);

        var reportFile = reportDir + '/db_' + id + '.pdf';
        //  const cookie = {url: reportUrl, name: 'JSESSIONID', value: sessionId}
        const pdfWin = new PDFWindow({
            frame: true,
            resizable: false,
            top: true,
            show: false,
            backgroundColor: '#2e2c29',
            parent: mainWindow,
            alwaysOnTop: true
        });
        pdfWin.maximize();
        //    pdfWin.webContents.openDevTools();

        var j = request.jar();
        var cookie = request.cookie(session);
        j.setCookie(cookie, _reportUrl);

        var stream = fs.createWriteStream(reportFile);

        var reportLoadUrl = reportUrl + 'rest_v2/reports/reports/Ebeyan/' + reportName + '.pdf?idDetayliBeyan=' + id;
        request({
            url: reportLoadUrl,
            jar: j,
            headers: {
                'content-type': 'application/pdf'
            }
        }).pipe(stream);
        stream.on('close', function () {
            PDFWindow.addSupport(pdfWin);
            pdfWin.loadURL(reportFile);
            pdfWin.show();
        });
        pdfWin.on('closed', function () {
            fs.unlink(reportFile, function () {
            })
        })
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
