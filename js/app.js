(() => {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const {ipcRenderer} = require('electron');
    // Components
    const {Canv, View} = require('../js/components/viewport.js');
    const {ListFiles, FileEx} = require('../js/components/fileviewer.js');
    const {Loading} = require('../js/components/loading.js');
    
    let scale = 1;
    let defaultScale = 1; 
    
    const load = () => {
        ReactDOM.render(<Loading style={{}}/>, document.getElementById('loadingPage'));
        // Set initial size of canvas

        ReactDOM.render(
            <div>
                <div id="viewportcont">
                    <View wheel={()=>{}}/>
                </div>
                <FileEx/>
                <div className="objectsMenu"></div>
                <div className="settingsMenu"></div>
            </div>,
            document.getElementById('mainEngine')
        );
        ReactDOM.render(
            <View wheel={wheel}/>,
            document.getElementById('viewportcont')
        )
        viewportReset();

        // Register menu events
        ipcRenderer.on('menu', (event, arg) => {
            if (arg == 'resetzoom') viewportReset();
        }); 

        ReactDOM.render(<Loading style={{display: 'none'}}/>, document.getElementById('loadingPage'));
    };

    const wheel = (evt) => {
        if ((document.body.clientHeight*0.6)/2048 !== defaultScale) viewportReset();
        if (scale-(evt.deltaY/20000) > 0 && scale-(evt.deltaY/20000) <= defaultScale) scale-=(evt.deltaY/20000);
        ReactDOM.render(<Canv style={{transform: `scale(${scale}) translate(-50%, -50%)`}}/>, document.getElementById('viewport'));
    };

    // The viewport function
    const viewportReset = () => {
        scale = (document.body.clientHeight*0.6)/2048;
        defaultScale = scale;
        ReactDOM.render(<Canv style={{transform: `scale(${scale}) translate(-50%, -50%)`}}/>, document.getElementById('viewport'));
    };
    window.onload = load;
})();