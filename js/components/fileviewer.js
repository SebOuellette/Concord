const React = require('react');
const ReactDOM = require('react-dom');
const fs = require('fs');
const path = require('path');
let curPath = path.dirname(require.main.filename).split('\\').slice(0,-1).join('\\');

export class ShowFiles extends React.Component {
    render() {
        let dir = {
            folders: [],
            files: []
        };
        const files = fs.readdirSync(this.props.path);
        files.forEach(e => {fs.lstatSync(`${this.props.path}\\${e}`).isFile() ? dir.files.push(e) : dir.folders.push(e)});

        return (
            <div>
                {dir.folders.map((e, i) => <div><div path={`${this.props.path}\\${e}`} style={{display: 'block'}} className={`fsparent folder folder${this.props.nested}`} onClick={obj => dirclick(this, e, this.props.path, i, this.props.nested)}><div className='folderArrow'></div><p>{e}</p></div><div className={`content${this.props.nested} content`}></div></div>)}
                {dir.files.map(e => <div style={{display: 'block'}} className='fsparent file'><p>{e}</p></div>)}
            </div>
        );
    }
}

const dirclick = (data, file, path, num, nested) => {
    console.log(nested);
    console.log(num);
    const obj = document.getElementsByClassName(`folder${nested}`)[num];
    const content = document.getElementsByClassName(`content${nested}`)[num];
    obj.classList.toggle('active');
    let showfiles;
    if (obj.classList.contains('active')) {
        showfiles = <ShowFiles path={`${path}\\${file}`} nested={(+nested)+1}/>;
    }

    ReactDOM.render(
        <div>
            {showfiles}
        </div>,
        content
    );
};

export class FileEx extends React.Component {
    render() {
        return (
            <div className="fileExplorer">
                <div id="dir"><ShowFiles path={curPath} nested='0'/></div>
                <dir id="files"></dir>
            </div>
        );
    }
}