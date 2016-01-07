const React = require('react');

module.exports = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});
