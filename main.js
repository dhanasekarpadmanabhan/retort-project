/*
 *author-dhanasekar
 * when npm starts the application is execute this javascript page
 *app.on(ready) will run the creatwindow
 */
// the below variable functions modifier will call the function present in window.js
// window.js has funciton which are used to create the window
// and which maps to the required application to which it travel
var functions = require('./resource/js/window.js')
const {
    app,
    ipcMain
} = require('electron')
const $ = require('jquery')

ipcMain.on('sample_Main', (event, arg) => {
    global.product = arg;
    process.env.productindustry=arg
    functions.sampleWindow()
})

ipcMain.on('addWindow', (event, arg) => {
    functions.secondWindow()
})

ipcMain.on('item:invo', (event, arg) => {
    functions.third(arg, this)
})


ipcMain.on('item:customer', (event, arg) => {
    functions.fourth(arg, this)
})
ipcMain.on('item:sales/invoice', (event, arg) => {
    functions.fifth(arg, this)
})
app.on('ready', functions.createWindow_Index_Window)
