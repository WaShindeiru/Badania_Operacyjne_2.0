const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
var kill = require('tree-kill');

function createWindow () {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    icon: __dirname + '/wuzekpsculka.png',
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  win.loadURL(`file://${__dirname}/dist/factory/index.html`);

} 

var jarPath = __dirname + '\\' + 'fabrykaBackend.jar'; 


var { spawn } = require('child_process');
var child = spawn('java', ['-jar', jarPath, '']);


child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});

child.on('exit', function (code, signal) {
  console.log("Java zabita")
  console.log('child process exited with ' +
              `code ${code} and signal ${signal}`);
});


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


app.on('will-quit', () => {
  //child.kill()
  kill(child.pid);

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {    
    app.quit()
    
  }
})