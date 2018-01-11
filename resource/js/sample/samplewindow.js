const {
    app,
    BrowserWindow,
    Menu,
    shell
} = require('electron')
const Menu1 = Menu;
const url = require('url')
const path = require('path')
const {
    ipcMain
} = require('electron')
const $ = require('jquery')
let product_code
//gate pass entry
let samplewin1


function sampleWindow() {
    samplewin1 = new BrowserWindow({
        width: 1260,
        height: 650,
        globals: {
            industries: this.product_code
        }
    })
    //win10 will open a new browser for which it has a sample_main_page .html page view by which it shows the detaile regarding perfoming operation in the sample window
    samplewin1.loadURL(url.format({
        pathname: path.join(__dirname, "../../html/sample/Gate_pass_entry.html"),
        protocol: 'file:',
        slashes: true
    }))
    //  const mainWindowMenuBar = Menu.buildFromTemplate(onlyprint);
    //  samplewin1.setMenu(mainWindowMenuBar)
    samplewin1.on('closed', () => {
        samplewin1 = ""
    })
}
exports.test = function(arg) {
    global.product_code = arg;

    sampleWindow()

}
