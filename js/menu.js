const {Menu, app, shell, dialog} = require('electron');
const path = require('path');
const appDir = path.dirname(require.main.filename);

exports.run = contact => {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click(item, focusedWindow) {focusedWindow.close()}
                },
                {type: 'separator'},
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        console.log(dialog.showOpenDialog({
                            filters: [
                                {name: 'Concord Project', extensions: ['ccrd']},
                                {name: 'All Files', extensions: ['*']}
                            ],
                            defaultPath: `${appDir}\\projects`,
                            title: 'Select Project',
                            properties: ['openFile']
                        }));
                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click() {}
                },
                {
                    label: 'Save As',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click() {}
                },
                {type: 'separator'},
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click(item, focusedWindow) {
                        const data = {
                            type: 'newWin',
                            project: ''
                        }
                        contact.emit('menu', (data, focusedWindow));
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click (item, focusedWindow) {
                        if (focusedWindow) focusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click (item, focusedWindow) {
                        if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                    }
                },
                {type: 'separator'},
                {
                    label: 'Reset Viewport Zoom',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+O' : 'Ctrl+Shift+O',
                    click(item, focusedWindow) {
                        const data = {
                            type: 'renderer',
                            action: 'resetzoom',
                            window: focusedWindow
                        }
                        contact.emit('menu', data);
                    }
                },
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            label: 'Window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click () {
                        shell.openExternal('http://electron.atom.io');
                    }
                }
            ]
        }
    ];


    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}