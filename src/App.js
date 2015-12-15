const React = require('react');

module.exports = React.createClass({
    getInitialState() {
        return {
            style: {
                backgroundImage: 'url("../public/inside_1.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                width: '100%',
                height: '100%'
            }
        };
    },
    render() {
        return (
            <div style={this.state.style}><h1>Hello, Ethuil</h1></div>
        );
    }
});
