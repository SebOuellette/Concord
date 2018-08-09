const React = require('react');

export class Loading extends React.Component {
    render() {
        return (
            <div style={this.props.style} className='loading'>
                <div className='loaders'>
                    <div className='one'></div>
                    <div className='two'></div>
                    <div className='three'></div>
                    <div className='four'></div>
                    <div className='five'></div>
                </div>
                <object className='loadinglogo' data="../designs/logo.svg" type='image/svg+xml'></object>
            </div>
        );
    }
}