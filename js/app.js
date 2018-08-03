(() => {
    const {ipcRenderer} = require('electron');
    const load = () => {
        document.getElementById('loadingPage').style.display = 'none';
        viewportReset();
        ipcRenderer.on('menu', (event , arg) => {
            if (arg == 'resetzoom') {viewportReset()}
        });
    };

    const viewportReset = () => {
        const canvas = document.getElementById('canvas');
        canvas.height = document.body.clientHeight*0.6;
        canvas.width = document.body.clientHeight*0.6;
    };
    window.onload = load;
})();