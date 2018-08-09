const React = require('react');

export class Canv extends React.Component {
    render() {
        return (
            <canvas id="canvas" height="2048" width="2048" style={this.props.style}/>
        );
    }
}

export class View extends React.Component {
    render() {
        return (
            <div onWheel={this.props.wheel} id='viewport'>
                <Canv style={{}}/>
            </div>
        );
    }
}