const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const {Class} = require('./js/class.js');
const contact = new Class();

// Create the 'win' variable in the global scope
let wins = [];

const createWindow = () => {
    // Create the window and show content
    let win;
    win = new BrowserWindow({width: 800, minWidth: 800, height: 600, minHeight: 600, icon: './designs/logodark.png'});
    win.loadFile('./html/index.html');

    // Clear the win variable once it is closed
    win.on('closed', () => {
        win = null;
        contact.wins = wins;
    });
    wins.push({win});
    contact.wins = wins;

    // Start the menu
    require('./js/menu.js').run(contact);
};

// Runs when other files need to contact this file
contact.on('menu', arg => {
    if (arg.type === 'newWin') {
        createWindow();
    } else if (arg.type === 'renderer') {
        arg.window.webContents.send('menu', arg.action);
    }
});

// Launch the starting procedure once electron is ready
app.on('ready', createWindow);

// Close all processes once all the windows are closed (in case I add multi window toolbars later)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Create a new window when activated
app.on('activate', () => {
    if (win === null) createWindow();
});
