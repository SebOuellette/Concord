const {app, BrowserWindow, Menu} = require('electron');

// Create the 'win' variable in the global scope
let win;

const createWindow = () => {
    // Create the window
    win = new BrowserWindow({width: 800, minWidth: 800, height: 600, minHeight: 600, icon: './designs/logodark.png'});

    // Load the main page
    win.loadFile('./html/index.html');

    // Clear the win variable once it is closed
    win.on('closed', () => {
        win = null;
    });

    // Start the menu
    require('./js/menu.js');
};



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