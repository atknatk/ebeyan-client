var ipcRenderer = require('electron').ipcRenderer;

var syncMsgBtn = document.getElementById('save-settings');
var service = document.getElementById('service-url');
var eimza = document.getElementById('eimza-url');
var report = document.getElementById('report-url');
if(!service.value){
    service.value = 'http://localhost/ebeyan';
}
if(!eimza.value){
    eimza.value = 'http://localhost:5101';
}
if(!report.value){
    report.value = 'http://localhost:8080/jasperserver/';
}


syncMsgBtn.addEventListener('click', function () {
    var data = {
        serverUrl: service.value,
        eimzaUrl: eimza.value,
        reportUrl: report.value
    };
    console.log(data);
    var reply = ipcRenderer.sendSync('save-settings', data);

    if (reply !== 'success') {
        alert('Hata Oluştu');
    }

});
