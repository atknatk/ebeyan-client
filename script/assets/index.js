/**
 * Created by cabbar on 01.06.2017.
 */
/* jshint node: true */
var httpProxy = require('http-proxy');
var autoUpdater = require("electron-updater").autoUpdater;
var session = require('electron').session;
var log = require('electron-log');
var fs = require('fs');
var request = require('request');
var _url = require('url');
var path = require('path');
var settings = require('electron-settings');
var settingsWindow = require('./settings-window');
var getPort = require('get-port');
var defaultPort = 4000;
// var child_process = require('child_process');

var electron = require('electron');
// Module to control application life.
var app = electron.app;
// Module to create native browser window.
var BrowserWindow = electron.BrowserWindow;
var url = require('url');


// const Config = require('electron-config');
var proxy = httpProxy.createProxyServer({changeOrigin: true});
var html = __dirname + '/';

var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

var PDFWindow = require('electron-pdf-window');

// var host = 'http://10.10.5.150';
//var host = 'http://10.30.0.195';
//var reportHost = 'http://10.30.0.195';
//var host = 'http://srvgumrukapp';
var host = 'http://srvgumrukapp';
var reportHost = 'http://srvgumrukapp';
// var host = 'http://GMRREPORT';
// var reportHost = 'http://GMRREPORT';


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


(function () {
    "use strict";


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
                    if (err && err.errno !== process.EEXIST) {
                        cb(err);
                    }
                    else {
                        fs.mkdir(p, mode, cb);
                    }
                });
            }
        });
    }


    function sendStatusToWindow(text) {
        console.log(text);
        log.info(text);
        if (mainWindow) {
            mainWindow.webContents.send('message', text);
        }
    }

    autoUpdater.on('checking-for-update', function () {
        sendStatusToWindow('Checking for update...');
    });
    autoUpdater.on('update-available', function (info) {
        sendStatusToWindow('Update available.');
    });
    autoUpdater.on('update-not-available', function (info) {
        sendStatusToWindow('Update not available.');
    });
    autoUpdater.on('error', function (err) {
        sendStatusToWindow('Error in auto-updater. ' + err);
    });
    autoUpdater.on('download-progress', function (progressObj) {
        var log_message = "Download speed: " + progressObj.bytesPerSecond;
        log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
        log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
        sendStatusToWindow(log_message);
    });
    autoUpdater.on('update-downloaded', function (info) {
        sendStatusToWindow('Update downloaded');
    });


    function createAppProxy(webserivceUrl, eimzaUrl, port) {
        express().use(compression())
            .use(bodyParser.json())//json parser
            .use(bodyParser.urlencoded({extended: false}))//urlencoded parser
            // Static content
            .use(express.static(html))
            .all("/api/*", function (req, res) {
                // proxy.web(req, res, {target: 'http://10.10.5.150/gtbebeyan'});
                proxy.web(req, res, {target: webserivceUrl});
            })
            .all("/pdf/detaylibeyan/:id", function (req, res) {
                openPdf(req.params.id, 'Beyanname');
                res.json(200, {isSucess: true, status: 0});
            })
            .all("/pdf/detaylibeyanbos/:id", function (req, res) {
                openPdf(req.params.id, 'BeyannameBos');
                res.json(200, {isSucess: true, status: 0});
            })
            .all("/dinazor/*", function (req, res) {
                // proxy.web(req, res, {target: 'http://localhost:5101'});
                proxy.web(req, res, {target: eimzaUrl});
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
                    return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
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
    }

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
    var mainWindow;

    function createWindow(port, isDestroy) {
        // Create the browser window.
        mainWindow = new BrowserWindow();
        mainWindow.maximize();
        // and load the index.html of the app.
        mainWindow.loadURL('http://localhost:' + port);
        //  mainWindow.webContents.openDevTools()
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
        console.log('isDestroy : ' + isDestroy)
        setTimeout(function () {
            console.log('isDestroy : ' + isDestroy)
            if (isDestroy === true && settingsWindow !== null) {
                settingsWindow.destroy();
            }
        }, 5000);
        autoUpdater.checkForUpdatesAndNotify();
    }


    function openPdf(id, reportName) {
        request(reportUrl + 'login/rest/login?j_username=jasperadmin&j_password=jasperadmin', function (err, res) {
            var arr = res.headers['set-cookie'];
            var j = request.jar();
            var session = arr[0].split(';')[0];
            var sessionId = session.substring(11);
            console.log(sessionId);
            var url = reportUrl + 'rest_v2/reports/reports/Ebeyan/' + reportName + '.pdf';
            console.log(url);

            var reportFile = reportDir + '/db_' + id + '.pdf';
            //  const cookie = {url: reportUrl, name: 'JSESSIONID', value: sessionId}
            var pdfWin = new PDFWindow({
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

            j = request.jar();
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
                });
            });
        });
    }

    app.on('ready', function () {
        if (settings.has('serverUrl') || settings.has('eimzaUrl')) {

            getPort({port: defaultPort}).then(function (port) {
                createAppProxy(settings.get('serverUrl'), settings.has('eimzaUrl'), port);
                createWindow(port);
            });
        } else {
            settingsWindow.createWindow(function (isSaved) {
                console.log('isSaved: ' + isSaved);
                if (isSaved) {
                    getPort({port: defaultPort}).then(function (port) {
                        createAppProxy(settings.get('serverUrl'), settings.has('eimzaUrl'), port);
                        createWindow(port, true);
                    });
                } else {
                    app.quit();
                }
            });
        }
    });

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    /*app.on('activate', function () {
        if (mainWindow === null) {
            createWindow();
        }
    });*/
})();


